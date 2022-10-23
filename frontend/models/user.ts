import { User } from "@prisma/client";
import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { Dispatch } from "./store";

interface UsersState {
  [key: string]: User;
}

export const users = createModel<RootModel>()({
  state: {} as UsersState,
  reducers: {
    receiveUsers: (
      _state: UsersState,
      { users }: { users: User[] }
    ): UsersState => {
      return users.reduce(
        (nextState: UsersState, user: User) => ({
          ...nextState,
          [user.id]: user,
        }),
        {}
      );
    },
  },
  effects: (dispatch: Dispatch) => ({
    createUser: async (): Promise<void> => {
      dispatch.api.createUser();
    },
  }),
});
