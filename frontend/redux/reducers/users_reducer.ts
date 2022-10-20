import { USERS_TYPES } from "frontend/redux/redux_types";

export const usersReducer = (state: any = {}, { type }: any) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (type) {
    case USERS_TYPES.USER:
      return nextState;
    default:
      return nextState;
  }
};
