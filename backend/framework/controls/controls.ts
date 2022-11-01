import { User } from "@prisma/client";
import { NextApiRequest } from "next";

export type ControllerHandler = (
  req: NextApiRequest,
  user?: User
) => unknown;

export type Controls = {
  [key: string]: ControllerHandler;
};
