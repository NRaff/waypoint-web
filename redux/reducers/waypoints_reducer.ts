import { WAYPOINTS_TYPES } from "redux/redux_types"

export const waypointsReducer = (state: any = {}, { type }: any) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch (type) {
    case WAYPOINTS_TYPES.WAYPOINT:
      return nextState
    default:
      return nextState
  }
}