import { User } from "@prisma/client";
import { JSONSchemaType } from "ajv";
import ClerkService from "backend/auth/clerk-service";
import { Controller } from "backend/framework/controls/controls";
import { RouteRequirement } from "backend/framework/requests/RouteHandler";
import { NextApiRequest } from "next";
import { UserPersister } from "./users-persister";

// add route definition
export interface UserCreateRequest {
  name: string;
  email: string;
}

enum UserControls {
  upserUser = "upsertUser",
  createUser = "createUser",
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

// DEPRECATED: Should remove all create functions
const createUser = async (
  req: NextApiRequest
): Promise<User> => {
  const { name, email } = req.body as UserCreateRequest;
  return UserPersister.create({
    name,
    email,
    authenticationId: "Manual addition",
  });
};

const upsertUser = async (req: NextApiRequest): Promise<User> =>
  UserPersister.upsertUser(req.body);

const UserController = Controller.register<UserControls>({
  name: "users",
  handlers: {
    createUser: {
      handler: createUser,
      route: "/create",
      routeRequirement: RouteRequirement.public,
      getSchema: () => createSchema,
    },
    upsertUser: {
      handler: upsertUser,
      route: "/upsert",
      routeRequirement: RouteRequirement.withUser,
      getSchema: () => createSchema,
    },
  },
});

export default UserController;
