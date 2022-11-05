import type { NextApiRequest, NextApiResponse } from "next";
import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import { User } from "@prisma/client";
import { UserPersister } from "backend/users/users-persister";
import { ControllerHandler } from "../controls/controls";
import { getAuth } from "@clerk/nextjs/server";
import ClerkService from "backend/auth/clerk-service";
import AuthController from "backend/auth/auth-controller";

type ErrorResponse = {
  status: number;
  message: string;
  errors?: any[];
};

class RequestValidator<TReq, TRes> {
  request: NextApiRequest;
  response: NextApiResponse<TRes | ErrorResponse>;
  validate: ValidateFunction<TReq> | null;
  constructor(
    request: NextApiRequest,
    response: NextApiResponse,
    schema?: JSONSchemaType<TReq>
  ) {
    this.request = request;
    this.response = response;
    this.validate = schema ? this.setValidate(schema) : null;
    this.assertRequestIsValid();
  }

  private setValidate(schema: JSONSchemaType<TReq>) {
    const ajv = new Ajv();
    return ajv.compile(schema);
  }

  private assertRequestBody() {
    if (this.validate !== null) {
      if (!this.validate(this.request.body)) {
        this.response.status(404).send({
          status: 404,
          message: "Invalid request",
          errors: this.validate.errors
            ? this.validate.errors
            : undefined,
        });
      }
      console.info(`Request at successfully validated`, {
        url: this.request.url,
        body: this.request.body,
      });
    } else {
      console.info("No request validation required", {
        requestBody: this.request.body,
      });
    }
  }

  private assertIsPostRequest() {
    if (this.request.method !== "POST") {
      console.error(`Request attempted with incorrect method`, {
        method: this.request.method,
        requestData: this.request.body,
      });
      this.response.status(404).send({
        status: 404,
        message: "Only post requests allowed",
      });
    }
    return null;
  }

  assertRequestIsValid() {
    this.assertIsPostRequest();
    this.assertRequestBody();
  }

  isRequestError() {
    return this.response.statusCode !== 200;
  }
}

export enum RouteRequirement {
  withUser = "authenticatedUser",
  withAdmin = "authenticatedAdmin",
  public = "public",
}

//TODO: fix path to be of type route
class RouteHandler<TReq, TRes> {
  name: string;
  path: string;
  handler: ControllerHandler;
  schema?: JSONSchemaType<TReq>;
  constructor(
    name: string,
    path: string,
    handler: ControllerHandler,
    schema?: JSONSchemaType<TReq>
  ) {
    this.name = name;
    this.path = path;
    this.handler = handler;
    this.schema = schema;
  }

  private getAdminForRequest = async (
    request: NextApiRequest
  ): Promise<User> => {
    //todo: implement real admin by checking claims
    return AuthController.getOrCreateAuthenticatedUser(request);
  };

  private getRequestUser = async (
    requirement: RouteRequirement,
    request: NextApiRequest
  ) => {
    switch (requirement) {
      case RouteRequirement.withUser:
        return AuthController.getOrCreateAuthenticatedUser(
          request
        );
      case RouteRequirement.withAdmin:
        return this.getAdminForRequest(request);
      case RouteRequirement.public:
        console.info("Public route was requested", {
          url: request.url,
        });
        return;
      default:
        "No route requirement specified";
        throw new Error("No route requirment specified");
    }
  };

  createHandler = (requirement: RouteRequirement) => {
    return async (
      request: NextApiRequest,
      response: NextApiResponse<TRes>
    ) => {
      console.log(`Begin request to ${this.path}`, {
        routeName: this.name,
        routePath: this.path,
        headers: request.headers,
      });
      const maybeRouteUser = await this.getRequestUser(
        requirement,
        request
      );
      const validatedRequest = new RequestValidator<TReq, TRes>(
        request,
        response,
        this.schema
      );
      if (validatedRequest.isRequestError()) {
        return validatedRequest.response;
      }
      const result = await this.handler(request, maybeRouteUser);
      console.log(`Completed request to ${this.path}`, {
        routeName: this.name,
        routePath: this.path,
        result,
      });
      return response.status(200).send(result as TRes);
    };
  };

  createAuthenticatedUserRoute() {
    return this.createHandler(RouteRequirement.withUser);
  }

  createAuthenticatedAdminRoute() {
    return this.createHandler(RouteRequirement.withAdmin);
  }

  createPublicRoute() {
    return this.createHandler(RouteRequirement.public);
  }
}

export default RouteHandler;
