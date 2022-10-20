import { Course, ReduxAction } from "shared/utility/types";

export enum CourseActionTypes {
  UpdateName = "UPDATE_NAME",
  UpdateLength = "UPDATE_LENGTH",
  UpdateType = "UPDATE_TYPE",
  AddWaypoint = "ADD_WAYPOINT",
  RemoveWaypoint = "REMOVE_WAYPOINT",
}

export const CourseReducer = (
  state: Course,
  { type, payload }: ReduxAction
): Course => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (type) {
    case "UPDATE_NAME":
      payload.course.name = payload.update;
      nextState.name = payload.update;
      return nextState;
    case "UPDATE_LENGTH":
      nextState.length = payload;
      return nextState;
    case "UPDATE_DURATION":
      nextState.duration = payload;
      return nextState;
    case "UPDATE_TYPE":
      nextState.type = payload;
      return nextState;
    case "ADD_WAYPOINT":
      nextState.waypoints[payload.id] = payload.getWaypoint;
      nextState.waypointsList = Object.keys(nextState.waypoints);
      return nextState;
    case "REMOVE_WAYPOINT":
      delete nextState.waypoints[payload.id];
      nextState.waypointsList = Object.keys(nextState.waypoints);
      return nextState;
    default:
      return state;
  }
};
