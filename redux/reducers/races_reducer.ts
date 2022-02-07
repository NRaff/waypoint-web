import { RACES_TYPES } from "redux/redux_types"

export const racesReducer = (state: any = {}, { type }: any) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch (type) {
    case RACES_TYPES.RACE:
      return nextState
    default:
      return nextState
  }
}