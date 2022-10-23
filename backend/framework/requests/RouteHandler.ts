import type {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";
import Ajv, { JSONSchemaType } from "ajv";

type ErrorResponse = {
  status: number;
  message: string;
  errors?: any[];
};

class RequestValidator<TReq, TRes> {
  request: NextApiRequest;
  response: NextApiResponse<TRes | ErrorResponse>;
  validate: any;
  constructor(
    request: NextApiRequest,
    response: NextApiResponse,
    schema: JSONSchemaType<TReq>
  ) {
    this.request = request;
    this.response = response;
    this.validate = this.setValidate(schema);
    this.assertRequestIsValid();
  }

  private setValidate(schema: JSONSchemaType<TReq>) {
    const ajv = new Ajv();
    return ajv.compile(schema);
  }

  private assertRequestBody() {
    if (!this.validate(this.request.body)) {
      this.response.status(404).send({
        status: 404,
        message: "Invalid request",
        errors: this.validate.errors,
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

//TODO: fix path to be of type route
class RouteHandler<TReq, TRes> {
  name: string;
  path: string;
  handler: NextApiHandler<TRes>;
  schema: JSONSchemaType<TReq>;
  constructor(
    name: string,
    path: string,
    handler: NextApiHandler,
    schema: JSONSchemaType<TReq>
  ) {
    this.name = name;
    this.path = path;
    this.handler = handler;
    this.schema = schema;
  }

  createHandler() {
    return async (
      request: NextApiRequest,
      response: NextApiResponse<TRes>
    ) => {
      const validatedRequest = new RequestValidator<TReq, TRes>(
        request,
        response,
        this.schema
      );
      if (validatedRequest.isRequestError()) {
        return validatedRequest.response;
      }
      console.log(`Begin request to ${this.path}`, {
        routeName: this.name,
        routePath: this.path,
      });
      const result = await this.handler(request, response);
      console.log(`Completed request to ${this.path}`, {
        routeName: this.name,
        routePath: this.path,
      });
      return response.status(200).send(result as TRes);
    };
  }
}

export default RouteHandler;
