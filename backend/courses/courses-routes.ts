import { Course } from "@prisma/client";
import RouteHandler from "backend/framework/requests/RouteHandler";
import { NextApiHandler, NextApiRequest } from "next";
import { CoursePersister } from "./courses-persister";
import CoursesController from "./courses-controller";

const CoursesRoutes = {
  getAll: CoursesController.getAll as NextApiHandler<Course[]>,
};
