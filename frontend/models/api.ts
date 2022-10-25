import { createModel } from "@rematch/core";
import axios from "../../config/api.config";
import { RootModel } from "frontend/models";
import { Dispatch } from "./store";
import { AxiosResponse } from "axios";
import DecoratedApi, {
  ApiRoutesConfig,
} from "frontend/framework/requests/DecoratedApi";
import { UserControls } from "./users";
import { CoursesControls } from "./courses";

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

export type RouteConfig = {
  route: string; // todo: update to routes enum
  request: <TRequest, TResponse>(
    options: TRequest
  ) => Promise<AxiosResponse<TResponse>>;
};

interface ModelsConfig {
  courses: Record<CoursesControls, RouteConfig>;
  users: Record<UserControls, RouteConfig>;
}

const API_CONFIG: ModelsConfig = {
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