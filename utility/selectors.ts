import { useSelector } from "react-redux";
import { Course as CourseType } from "./types";

export function useSession() {
  return useSelector((state: any) => state.session);
}

export function useAuthErrors() {
  return useSelector((state: any) => state.errors.auth);
}

export function useCourses(): Array<CourseType> {
  return useSelector((state: any) =>
    Object.values(state.courses)
  );
}

export function useCourse() {
  const selectedCourse = useSelector(
    (state: any) => state.ui.selectedCourse
  ) as string;
  return useSelector(
    (state: any) => state.courses[selectedCourse]
  ) as CourseType | null;
}
