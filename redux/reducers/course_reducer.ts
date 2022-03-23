import { Course, ReduxAction } from "utility/types"

export const CourseReducer = (state: Course, { type, payload }: ReduxAction): Course => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch (type) {
    case 'UPDATE_NAME':
      nextState.name = payload
      return nextState
    case 'UPDATE_LENGTH':
      nextState.length = payload
      return nextState
    case 'UPDATE_DURATION':
      nextState.duration = payload
      return nextState
    case 'UPDATE_TYPE':
      nextState.type = payload
      return nextState
    case 'ADD_WAYPOINT':
      nextState.waypoints[payload.waypoint_id] = payload
      nextState.waypointsList = Object.keys(nextState.waypoints)
      return nextState
    case 'REMOVE_WAYPOINT':
      delete nextState.waypoints[payload.waypoint_id]
      nextState.waypointsList = Object.keys(nextState.waypoints)
      return nextState
    default:
      return state
  }
}