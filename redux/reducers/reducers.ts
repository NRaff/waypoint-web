import { combineReducers } from "redux";
import { uiReducer, sessionReducer, errorsReducer } from "./ux_reducer";
import { usersReducer } from "./users_reducer";
import { coursesReducer } from "./courses_reducer";
import { racesReducer } from "./races_reducer";
import { pathsReducer } from "./race_paths_reducer";
import { waypointsReducer } from "./waypoints_reducer";
import * as types from "../redux_types"

//base reducer
const baseReducer = (state:any = 0, {type}:any) => {
  switch (type) {
    case types.BASE:
      return state + 1
    default:
      return state
  }
}

export default combineReducers({
  testReducer: baseReducer,
  ui: uiReducer,
  session: sessionReducer,
  errors: errorsReducer,
  users: usersReducer,
  courses: coursesReducer,
  races: racesReducer,
  racePaths: pathsReducer,
  waypoints: waypointsReducer
})