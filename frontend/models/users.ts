import { User } from "@prisma/client";
import { createModel } from "@rematch/core";
import { AxiosResponse } from "axios";
import { UserCreateRequest } from "backend/users/user-routes";
import { RootModel } from ".";
import { Dispatch } from "./store";

export enum UserControls {
  createUser = "createUser",
}

export type UserControlTypes = {
  [UserControls.createUser]: (
    user: UserCreateRequest,
    ...restArgs: any[]
  ) => Promise<AxiosResponse<User>>;
};
export interface UsersState {
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
    createUser: async (
      user: UserCreateRequest,
      ...restArgs: any[]
    ): Promise<User | void> => {
      console.log({ createUserArgs: restArgs });
      const response = await dispatch.api.createUser(
        user,
        ...restArgs
      );
      if (response.status === 200) {
        dispatch.users.receiveUsers({
          users: [response.data],
        });
      }
      //TODO: dispatch error
    },
  }),
});
