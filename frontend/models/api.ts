import { createModel } from "@rematch/core";
import axios from "../../config/api.config";
import { RootModel } from "frontend/models";
import { Dispatch } from "./store";
import { AxiosResponse } from "axios";
import { UserControls, UserControlTypes } from "./users";
import { CourseControlTypes, CoursesControls } from "./courses";
import DecoratedApi from "frontend/framework/requests/DecoratedApi";
import RequestHandler from "frontend/framework/requests/request";

type RequestState = {
  isLoading: boolean;
  route: string; // TODO: create a routes enum
  error?: any;
};

interface ApiState {
  [key: string]: RequestState; // TODO: should use route as key
}

export type RouteConfig = {
  route: string; // todo: update to routes enum
  request: <TRequest, TResponse>(
    options: TRequest,
    ...restArgs: any[]
  ) => Promise<AxiosResponse<TResponse>>;
};

interface ModelsConfig {
  courses: Record<CoursesControls, RouteConfig>;
  users: Record<UserControls, RouteConfig>;
}

const API_CONFIG: ModelsConfig = {
  courses: {
    getAllCourses: {
      route: "/getAll",
      request: async (_options) =>
        axios.post("/api/courses/getAll"),
    },
  },
  users: {
    createUser: {
      route: "/create",
      request: async (user, ...restArgs: any[]) => {
        const api = new RequestHandler(restArgs[0].session);
        return api.request("/users/create", user);
      },
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
    const decoratedUsersApi = new DecoratedApi<
      UserControls,
      UserControlTypes
    >(API_CONFIG.users, dispatch);
    const decoratedCoursesApi = new DecoratedApi<
      CoursesControls,
      CourseControlTypes
    >(API_CONFIG.courses, dispatch);
    return {
      ...decoratedUsersApi.decoratedApiModel(),
      ...decoratedCoursesApi.decoratedApiModel(),
    };
  },
});
