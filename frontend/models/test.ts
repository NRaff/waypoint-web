import { createModel } from "@rematch/core";
import { RootModel } from "frontend/models";

interface TestState {
  [key: string]: number;
}

export const tests = createModel<RootModel>()({
  state: {} as TestState,
  reducers: {
    addTest(
      state: TestState,
      { name, number }: { name: string; number: number }
    ): TestState {
      return {
        ...state,
        [name]: number,
      };
    },
  },
});
