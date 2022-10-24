import { createModel } from "@rematch/core";
import { RootModel } from "frontend/models";
import { Course } from "shared/utility/types";
import { Dispatch } from "./store";

interface CourseState {
  [key: string]: Course;
}

export const courses = createModel<RootModel>()({
  state: {} as CourseState,
  reducers: {
    receiveAllCourses: (
      _state: CourseState,
      { courses }: { courses: Course[] }
    ): CourseState => {
      return courses.reduce(
        (nextState: CourseState, course: Course) => ({
          ...nextState,
          [course.id]: course,
        }),
        {}
      );
    },
  },
  effects: (dispatch: Dispatch) => ({
    getAllCourses: async (): Promise<void> => {
      console.log("make request to get all courses");
      dispatch.api.getAllCourses();
    },
  }),
});
