import { AxiosResponse } from "axios";
import { RouteConfig } from "frontend/models/api";
import { Dispatch } from "../../models/store";

export type ApiRoutesConfig<TControls extends string> = Record<
  TControls,
  RouteConfig
>;

export type ApiModelConfig<TControls extends string> = {
  [key in TControls]: (
    options?: unknown
  ) => Promise<AxiosResponse<unknown, any>>;
};

const decorateApiRequest =
  (dispatch: Dispatch, { route, request }: RouteConfig) =>
  async (options?: any) => {
    const currentUser = dispatch.currentUser;
    console.log({ currentDecoratedUser: currentUser });
    console.info("Initiate api request", {
      currentUser,
      request,
      route,
    });
    dispatch.api.setRequestState({
      route,
      isLoading: true,
    });
    const response = await request(options);
    console.info("Completed api request", {
      currentUser,
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
class DecoratedApi<TControls extends string, TControlTypes> {
  private apiModelConfig;
  constructor(
    config: ApiRoutesConfig<TControls>,
    dispatch: Dispatch
  ) {
    this.apiModelConfig = this.setApiConfig(config, dispatch);
  }

  private setApiConfig(
    config: ApiRoutesConfig<TControls>,
    dispatch: Dispatch
  ) {
    const configItems = Object.entries<RouteConfig>(config);
    return configItems.reduce(
      (modelConfig, [key, value]) => ({
        ...modelConfig,
        [key]: decorateApiRequest(dispatch, value),
      }),
      {} as TControlTypes
    );
  }

  decoratedApiModel() {
    return this.apiModelConfig;
  }
}

export default DecoratedApi;
