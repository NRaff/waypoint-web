import { Course, User } from "@prisma/client";
import prisma from "backend/prisma";

type CourseInsertParams = Omit<
  Course,
  "createdAt" | "updatedAt"
>;

const create = async (course: CourseInsertParams) =>
  prisma.course.create({
    data: course,
  });

const findById = async (courseId: Course["id"]) =>
  prisma.course.findFirstOrThrow({
    where: {
      id: courseId,
    },
  });

const findByCreator = async (creatorId: User["id"]) =>
  prisma.course.findMany({
    where: {
      createdById: creatorId,
    },
  });

const getAll = async () => prisma.course.findMany();

export const CoursePersister = {
  create,
  findById,
  findByCreator,
  getAll,
};
