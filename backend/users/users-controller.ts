import { User } from "@prisma/client";
import {
  ControllerHandler,
  Controls,
} from "backend/framework/controls/controls";
import { NextApiRequest } from "next";
import { UserPersister } from "./users-persister";
import { UserCreateRequest } from "./users-routes";

const createUser = async (
  req: NextApiRequest
): Promise<User> => {
  const { name, email } = req.body as UserCreateRequest;
  return UserPersister.create({
    name,
    email,
  });
};

const upsertUser: ControllerHandler = async (
  req: NextApiRequest
): Promise<User> => UserPersister.upsertUser(req.body);

const UserController: Controls = {
  createUser,
  upsertUser,
};

export default UserController;
