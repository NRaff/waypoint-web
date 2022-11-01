import { Course } from "@prisma/client";
import RouteHandler from "backend/framework/requests/RouteHandler";
import { NextApiRequest } from "next";
import { CoursePersister } from "./courses-persister";

const getAll = async (_req: NextApiRequest): Promise<Course[]> =>
  CoursePersister.getAll();

const getAllCoursesRoute = new RouteHandler<null, Course[]>(
  "getAllCourses",
  "/courses/getAll",
  getAll
);

export default getAllCoursesRoute.createAuthenticatedUserRoute();
