import { COURSES_TYPES } from "redux/redux_types";
import { ReduxAction } from "utility/types";

export const coursesReducer = (
  state: any = {},
  { type, payload }: ReduxAction
) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (type) {
    case COURSES_TYPES.RECEIVE_ALL_COURSES:
      return payload;
    default:
      return nextState;
  }
};
