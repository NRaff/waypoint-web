import { createModel } from "@rematch/core";
import { AxiosResponse } from "axios";
import { RootModel } from "frontend/models";
import { Course } from "shared/utility/types";
import { Dispatch } from "./store";

export enum CoursesControls {
  getAllCourses = "getAllCourses",
}

export type CourseControlTypes = {
  [CoursesControls.getAllCourses]: () => Promise<
    AxiosResponse<Course[]>
  >;
};
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
      const response = await dispatch.api.getAllCourses();
      if (response.status === 200) {
        dispatch.courses.receiveAllCourses({
          courses: response.data,
        });
      }
      // TODO: dispatch error
    },
  }),
});
