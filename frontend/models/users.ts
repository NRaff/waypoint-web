import { User } from "@prisma/client";
import { createModel } from "@rematch/core";
import { UserCreateRequest } from "backend/users/user-routes";
import { RootModel } from ".";
import { Dispatch } from "./store";

export enum UserControls {
  createUser = "createUser",
}
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
      console.log(users);
      const newState = users.reduce(
        (nextState: UsersState, user: User) => ({
          ...nextState,
          [user.id]: user,
        }),
        {}
      );
      console.log({ newState });
      return newState;
    },
  },
  effects: (dispatch: Dispatch) => ({
    createUser: async (
      user: UserCreateRequest
    ): Promise<User | void> => {
      const response = await dispatch.api.createUser(user);
      if (response.status === 200) {
        dispatch.users.receiveUsers({
          users: [response.data],
        });
      }
      //TODO: dispatch error
    },
  }),
});
