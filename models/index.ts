import { Models } from "@rematch/core";
import { courses } from "./course";

export interface RootModel extends Models<RootModel> {
  courses: typeof courses;
}

export const models: RootModel = { courses };
