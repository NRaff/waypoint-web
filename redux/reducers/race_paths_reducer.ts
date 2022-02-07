import { PATHS_TYPES } from "redux/redux_types"

export const pathsReducer = (state: any = {}, { type }: any) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch (type) {
    case PATHS_TYPES.PATH:
      return nextState
    default:
      return nextState
  }
}