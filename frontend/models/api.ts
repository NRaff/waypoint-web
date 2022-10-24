import { createModel, RematchDispatch } from "@rematch/core";
import axios from "../../config/api.config";
import { RootModel } from "frontend/models";
import { courses } from "./courses";
import { Dispatch, RootState } from "./store";
import { AxiosResponse } from "axios";
import { UserCreateRequest } from "backend/users/user-routes";
import { User } from "@prisma/client";
import DecoratedApi from "frontend/framework/requests/DecoratedApi";

export type HttpResponse<T> = {
  status:
    | 200
    | 201
    | 300
    | 302
    | 400
    | 401
    | 402
    | 403
    | 404
    | 500;
  data: T;
  error?: any;
};

type RequestState = {
  isLoading: boolean;
  route: string; // TODO: create a routes enum
  error?: any;
};

interface ApiState {
  [key: string]: RequestState; // TODO: should use route as key
}

const decorateApiRequest =
  <TPayload, TResponse>(
    dispatch: Dispatch,
    {
      route,
      request,
    }: {
      route: string; // TODO: update this to route enum
      request: (
        options?: TPayload
      ) => Promise<AxiosResponse<TResponse>>;
    }
  ): ((
    options?: TPayload
  ) => Promise<AxiosResponse<TResponse>>) =>
  async (options?: TPayload) => {
    console.info("Initiate api request", {
      user: dispatch.session.getSession(),
      route,
    });
    dispatch.api.setRequestState({
      route,
      isLoading: true,
    });
    const response = await request(options);
    console.info("Completed api request", {
      user: dispatch.session.getSession(),
      route,
      response,
    });
    if (response.status !== 200) {
      // TODO: should dispatch error toast
      console.error("There was an issue with your request", {
        ...response,
      });
      dispatch.api.setRequestState({
        route,
        isLoading: false,
        error: response.statusText,
      });
    }
    dispatch.api.setRequestState({
      route,
      isLoading: false,
    });
    return response;
  };

type ApiConfig = {
  [key: string]: {
    [key: string]: {
      route: string; // todo: update to routes enum
      request: <TRequest, TResponse>(
        options: TRequest
      ) => Promise<AxiosResponse<TResponse>>;
    };
  };
};

const API_CONFIG: ApiConfig = {
  courses: {
    getAllCourses: {
      route: "/getAllCourses",
      request: async () => {
        console.log("make request to get all courses");
        try {
          return await axios.post("/api/courses/create", {
            message: "hello world",
          });
        } catch (error) {
          console.log({ error });
          throw error;
        }
      },
    },
  },
  users: {
    createUser: {
      route: "/create",
      request: async <UserCreateRequest, User>(
        user: UserCreateRequest
      ): Promise<AxiosResponse<User>> =>
        axios.post<User>("/api/users/create", user),
    },
  },
};

export const api = createModel<RootModel>()({
  state: {} as ApiState,
  reducers: {
    setRequestState: (
      state: ApiState,
      { isLoading, error, route }: RequestState
    ) => ({
      ...state,
      [route]: {
        isLoading,
        route,
        error,
      },
    }),
  },
  effects: (dispatch: Dispatch) => {
    const decoratedUsersApi = new DecoratedApi(
      API_CONFIG.users,
      dispatch
    );
    const decoratedCoursesApi = new DecoratedApi(
      API_CONFIG.courses,
      dispatch
    );
    return {
      ...decoratedUsersApi.decoratedApiModel(),
      ...decoratedCoursesApi.decoratedApiModel(),
    };
  },
});
