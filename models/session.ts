import { createModel } from "@rematch/core";
import { RootModel } from "models";

interface SessionState {
  sessionId: string;
  userId: string;
}

export const session = createModel<RootModel>()({
  state: {} as SessionState,
  reducers: {
    receiveSession(
      _state: SessionState,
      clerkSSRState: any
    ): SessionState {
      return {
        sessionId: clerkSSRState.sessionId,
        userId: clerkSSRState.userId,
      };
    },
  },
});
