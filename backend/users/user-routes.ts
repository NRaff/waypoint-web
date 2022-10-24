import type {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { JSONSchemaType } from "ajv";
import { UserPersister } from "./user-persister";
import { User } from "@prisma/client";
import RouteHandler from "backend/framework/requests/RouteHandler";

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

const createUserRoute = new RouteHandler<
  UserCreateRequest,
  User
>("createUser", "/users/create", createUser, createSchema);

const upsertUserRoute = new RouteHandler<
  UserCreateRequest,
  User
>("upsertUser", "/users/create", upsertUser, createSchema);

export default upsertUserRoute.createHandler();
