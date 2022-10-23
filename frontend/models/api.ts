import { createModel, RematchDispatch } from "@rematch/core";
import axios from "../../config/api.config";
import { RootModel } from "frontend/models";
import { courses } from "./course";
import { Dispatch, RootState } from "./store";

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
  (
    dispatch: Dispatch,
    {
      route,
      request,
      options,
    }: {
      route: string; // TODO: update this to route enum
      request: (options?: any) => Promise<HttpResponse<any>>;
      options?: any;
    }
  ): (() => Promise<void>) =>
  async () => {
    console.info("Initiate api request", {
      user: dispatch.session.getSession(),
      route,
    });
    dispatch.api.setRequestState({
      route,
      isLoading: true,
    });
    const response = await request();
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
        error: response.error,
      });
    }
    dispatch.api.setRequestState({
      route,
      isLoading: false,
    });
  };

type ApiConfig = {
  [key: string]: {
    [key: string]: {
      route: string; // todo: update to routes enum
      request: <TRequest>(
        options: TRequest
      ) => Promise<HttpResponse<any>>;
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
    create: {
      route: "/create",
      request: async () =>
        axios.post("/api/users/create", {
          name: "Test User",
          email: "test@email.com",
        }),
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
  effects: (dispatch: Dispatch) => ({
    getAllCourses: decorateApiRequest(
      dispatch,
      API_CONFIG.courses.getAllCourses
    ),
    createUser: decorateApiRequest(
      dispatch,
      API_CONFIG.users.create
    ),
  }),
});
