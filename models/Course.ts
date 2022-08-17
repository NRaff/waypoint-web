import { createModel } from "@rematch/core";
import { RootModel } from "models";
import { Course } from "utility/types";

interface CourseState {
  [key: string]: Course;
}

export const courses = createModel<RootModel>()({
  state: {} as CourseState,
  reducers: {
    receiveAllCourses(
      _state: CourseState,
      { courses }: { courses: Course[] }
    ): CourseState {
      return courses.reduce(
        (nextState: CourseState, course: Course) => ({
          ...nextState,
          [course.id]: course,
        }),
        {}
      );
    },
  },
});
