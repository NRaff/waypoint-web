import { User } from "@prisma/client";
import prisma from "../../config/prisma.config";

type UserInsertParams = Omit<
  User,
  "id" | "createdAt" | "updatedAt"
>;

const create = async (user: UserInsertParams) =>
  prisma.user.create({
    data: user,
  });

const findById = async (userId: User["id"]) =>
  prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

export const UserPersister = {
  create,
  findById,
};
