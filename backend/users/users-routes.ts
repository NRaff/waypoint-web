import type { NextApiRequest } from "next";
import { JSONSchemaType } from "ajv";
import { UserPersister } from "./users-persister";
import { User } from "@prisma/client";
import RouteHandler from "backend/framework/requests/RouteHandler";
import UserController from "./users-controller";

// add route definition
export interface UserCreateRequest {
  name: string;
  email: string;
}

const createSchema: JSONSchemaType<UserCreateRequest> = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
  },
  required: ["name", "email"],
  additionalProperties: false,
};

const createUserRoute = new RouteHandler<
  UserCreateRequest,
  User
>(
  "createUser",
  "/users/create",
  UserController.createUser,
  createSchema
);

const upsertUserRoute = new RouteHandler<
  UserCreateRequest,
  User
>(
  "upsertUser",
  "/users/create",
  UserController.upsertUser,
  createSchema
);

export default upsertUserRoute.createPublicRoute();
