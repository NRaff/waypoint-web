import { Models } from "@rematch/core";
import { api } from "./api";
import { courses } from "./courses";
import { session } from "./session";
import { tests } from "./test";
import { users } from "./users";

export interface RootModel extends Models<RootModel> {
  api: typeof api;
  session: typeof session;
  courses: typeof courses;
  users: typeof users;
  tests: typeof tests;
}

export const models: RootModel = {
  session,
  api,
  courses,
  tests,
  users,
};
