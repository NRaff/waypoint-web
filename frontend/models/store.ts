import {
  init,
  RematchDispatch,
  RematchRootState,
  RematchStore,
} from "@rematch/core";
import { models, RootModel } from "frontend/models";
import { useMemo } from "react";
import logger from "redux-logger";

let store:
  | RematchStore<RootModel, Record<string, never>>
  | undefined;

const shouldUseLogger = false;
const middlewares = shouldUseLogger ? [logger] : [];
/**
 * Source from the next js example, [here](github.com/vercel/next.js/blob/canary/examples/with-rematch/shared/store.js),
 * and [here](https://github.com/naponmeka/nextjs-typescript-with-rematch/blob/main/store.ts)
 */
export const initializeStore = (initialState?: RootModel) => {
  if (initialState) {
    return init({
      models,
      redux: {
        initialState,
        middlewares,
      },
    });
  }
  return init({
    models,
    redux: {
      middlewares,
    },
  });
};

const isServerSide = () => typeof window === "undefined";

export const setupRematchStore = (
  preloadedState?: RootModel
) => {
  let _store = store ?? initializeStore(preloadedState);

  if (preloadedState && store) {
    _store = initializeStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (isServerSide()) {
    return _store;
  }
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState?: RootModel) => {
  const store = useMemo(
    () => setupRematchStore(initialState),
    [initialState]
  );
  return store;
};

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
