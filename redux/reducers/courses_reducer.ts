import { COURSES_TYPES } from "redux/redux_types"

export const coursesReducer = (state: any = {}, { type }: any) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)

  switch (type) {
    case COURSES_TYPES.COURSE:
      return nextState
    default:
      return nextState
  }
}