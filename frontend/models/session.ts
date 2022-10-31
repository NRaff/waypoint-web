import { createModel } from "@rematch/core";
import { RootModel } from "frontend/models";
import { Dispatch } from "./store";

interface SessionState {
  sessionId: string;
  userId: string;
}

export const session = createModel<RootModel>()({
  name: "session",
  state: {} as SessionState,
  reducers: {
    receiveSession: (
      _state: SessionState,
      clerkSSRState: any
    ): SessionState => ({
      sessionId: clerkSSRState.sessionId,
      userId: clerkSSRState.userId,
    }),
  },
});
