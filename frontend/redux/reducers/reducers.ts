import { combineReducers } from "redux";
import { uiReducer, sessionReducer, authErrorsReducer, courseErrorsReducer } from "./ux_reducer";
import { usersReducer } from "./users_reducer";
import { coursesReducer } from "./courses_reducer";
import { racesReducer } from "./races_reducer";
import { pathsReducer } from "./race_paths_reducer";
import { waypointsReducer } from "./waypoints_reducer";

export default combineReducers({
  ui: uiReducer,
  session: sessionReducer,
  errors: combineReducers({
    auth: authErrorsReducer,
    courses: courseErrorsReducer
  }),
  users: usersReducer,
  courses: coursesReducer,
  races: racesReducer,
  racePaths: pathsReducer,
  waypoints: waypointsReducer
})