import { Course } from "@prisma/client";
import { NextApiHandler } from "next";
import CoursesController from "./courses-controller";

const CoursesRoutes = {
  getAll: CoursesController.getAll as NextApiHandler<Course[]>,
};

export default CoursesRoutes;
