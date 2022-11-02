import { Course, User } from "@prisma/client";
import { Controller } from "backend/framework/controls/controls";
import { RouteRequirement } from "backend/framework/requests/RouteHandler";
import { NextApiRequest } from "next";
import { CoursePersister } from "./courses-persister";

const getAll = async (
  _req: NextApiRequest,
  user?: User
): Promise<Course[]> => CoursePersister.getAll();

enum CourseControls {
  getAll = "getAll",
}

const CoursesController = Controller.register<CourseControls>({
  name: "courses",
  handlers: {
    getAll: {
      handler: getAll,
      routeRequirement: RouteRequirement.withUser,
      route: "/getAll",
    },
  },
});

export default CoursesController;
