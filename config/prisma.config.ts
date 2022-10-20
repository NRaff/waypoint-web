import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const getPrisma = () => {
  if (prisma) {
    return prisma;
  }
  return new PrismaClient();
};

prisma = getPrisma();

export default prisma;
