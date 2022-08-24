import { Models } from "@rematch/core";
import { courses } from "./course";
import { tests } from "./test";

export interface RootModel extends Models<RootModel> {
  courses: typeof courses;
  tests: typeof tests;
}

export const models: RootModel = { courses, tests };
