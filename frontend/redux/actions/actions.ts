import {
  ReduxAction,
  Session,
} from "../../../shared/utility/types";
import { COURSES_TYPES, UX_TYPES } from "../redux_types";

const { SESSION, ERRORS, UI } = UX_TYPES;
const { AUTH, COURSE_ERR } = ERRORS;
export const signupUser = (payload: Session) => ({
  type: SESSION.SIGN_UP,
  payload,
});

export const loginUser = (payload: Session) => ({
  type: SESSION.LOGIN,
  payload,
});

export const logoutUser = () => ({
  type: SESSION.LOGOUT,
});

export const setAuthError = (type: string) => ({
  type,
});

export const setSelectedCourse = (payload: any) => ({
  type: UI.SELECT_COURSE,
  payload,
});

export const receiveAllCourses = (payload: any) => ({
  type: COURSES_TYPES.RECEIVE_ALL_COURSES,
  payload,
});

export const noCoursesFound = () => ({
  type: COURSE_ERR.NO_COURSES,
});
