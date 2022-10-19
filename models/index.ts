import { Models } from "@rematch/core";
import { api } from "./api";
import { courses } from "./course";
import { session } from "./session";
import { tests } from "./test";

export interface RootModel extends Models<RootModel> {
  api: typeof api;
  session: typeof session;
  courses: typeof courses;
  tests: typeof tests;
}

export const models: RootModel = {
  session,
  api,
  courses,
  tests,
};
