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

const upsertUser = async (user: UserInsertParams) =>
  prisma.user.upsert({
    where: {
      email: user.email || undefined,
    },
    create: {
      ...user,
    },
    update: {
      name: user.name,
    },
  });

export const UserPersister = {
  create,
  findById,
  upsertUser,
};
