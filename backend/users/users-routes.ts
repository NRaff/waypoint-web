import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import UserController from "./users-controller";

const UserRoutes = {
  upsertUser: UserController.upsertUser as NextApiHandler<User>,
  createUser: UserController.createUser as NextApiHandler<User>,
};

export default UserRoutes;
