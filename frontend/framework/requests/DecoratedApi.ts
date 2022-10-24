import { ModelEffect } from "@rematch/core";
import { AxiosResponse } from "axios";
import { RootModel } from "frontend/models";
import { Dispatch } from "../../models/store";

export interface ApiRoutesConfig {
  [key: string]: {
    route: string; // todo: update to routes enum
    request: <TRequest, TResponse>(
      options: TRequest
    ) => Promise<AxiosResponse<TResponse>>;
  };
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
class DecoratedApi {
  private apiModelConfig;
  constructor(config: ApiRoutesConfig, dispatch: Dispatch) {
    this.apiModelConfig = this.setApiConfig(config, dispatch);
  }

  private setApiConfig(
    config: ApiRoutesConfig,
    dispatch: Dispatch
  ) {
    const configItems = Object.entries(config);
    return configItems.reduce(
      (modelConfig, [key, value]) => ({
        ...modelConfig,
        [key]: decorateApiRequest(dispatch, value),
      }),
      {}
    );
  }

  decoratedApiModel() {
    return this.apiModelConfig;
  }
}

export default DecoratedApi;
