import { Course, CoursePermission } from "./types";

export const defaultCourse = (uid: string): Course => ({
  name: '',
  length: 0,
  duration: 0,
  type: CoursePermission.Private,
  created_by: uid,
  id: '',
  waypointsList: [],
  waypoints: {}
})