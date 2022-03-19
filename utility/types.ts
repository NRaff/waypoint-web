import { Dispatch } from "redux";

export interface Session {
  uid: string;
  displayName: string | null;
  photoUrl: string | null;
}

export interface Ui {
  selectedCourse: string | null;
  selectedRace: string | null;
}

export interface NewAuth {
  email: string;
  displayName: string;
  password: string;
}

export interface SignInAuth {
  email: string;
  password: string;
}

export interface User {
  id: string;
  displayName: string;
  profileImgUrl: string;
}

export interface ReduxAction {
  type: string;
  payload: any;
}

export interface BtnWithImgProps {
  action: Function;
  img?: string;
  title: string;
  style: string;
}

export interface NavItemProps {
  action: Function;
  title: string;
  style: string;
  tooltip?: string;
}

export interface ActivityListProps {
  type: 'Races' | 'Courses'
}

export interface ActivityHeaderProps {
  curType: string;
  setType: Function;
}

// TODO: Fix the props
export interface MapProps {
  courseDispatch: any;
}

export interface Activity {
  type: string;
  name: string;
  status: string;
  visibility: string;
}

export interface Coordinates {
  lat?: number;
  lng?: number;
}

export enum WaypointType {
  Start = 'Start',
  Port = 'Port',
  Starboard = 'Starboard',
  Gate = 'Gate',
  Finish = 'Finish'
}

export interface Waypoints {
  waypointsList: Array<string>;
  waypoints: {
    [key: string]: Waypoint;
  }
}

export interface Waypoint {
  name: string;
  course_id: string;
  type: WaypointType;
  point: Coordinates;
}

export interface Course extends Waypoints {
  name: string;
  length: number;
  duration: number;
  type: CoursePermission;
  created_by: string;
  id: string;

}

export interface NewCourse {

}

export enum CoursePermission {
  Private,
  Public,
}

export enum ActivityType {
  Races = 'races',
  Courses = 'courses'
}

export enum CourseDetailType {
  New = 'New',
  Selected = 'Selected',
}
