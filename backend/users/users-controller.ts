import { User } from "@prisma/client";
import { JSONSchemaType } from "ajv";
import { Controller } from "backend/framework/controls/controls";
import { RouteRequirement } from "backend/framework/requests/RouteHandler";
import { NextApiRequest } from "next";
import { UserPersister } from "./users-persister";

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

const createUser = async (
  req: NextApiRequest
): Promise<User> => {
  const { name, email } = req.body as UserCreateRequest;
  return UserPersister.create({
    name,
    email,
  });
};

const upsertUser = async (req: NextApiRequest): Promise<User> =>
  UserPersister.upsertUser(req.body);

enum UserControls {
  upserUser = "upsertUser",
  createUser = "createUser",
}

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
      routeRequirement: RouteRequirement.public,
      getSchema: () => createSchema,
    },
  },
});

export default UserController;
