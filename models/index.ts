import { Models } from "@rematch/core";
import { courses } from "./course";
import { session } from "./session";
import { tests } from "./test";

export interface RootModel extends Models<RootModel> {
  session: typeof session;
  courses: typeof courses;
  tests: typeof tests;
}

export const models: RootModel = { session, courses, tests };
