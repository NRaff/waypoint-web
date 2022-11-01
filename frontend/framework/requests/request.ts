import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000/api"
      : "",
  method: "POST",
  responseType: "json",
  maxRedirects: 5,
  timeout: 1000,
});

type UserSession = {
  sessionId: string;
  userId: string;
};

const isUserSession = (payload: any): UserSession | null => {
  if (payload?.sessionId && payload?.userId) {
    return {
      sessionId: payload.sessionId,
      userId: payload.userId,
    };
  }
  console.error("No user data for request", { payload });
  return null;
};

class RequestHandler {
  private session;
  constructor(params: any) {
    this.session = this.setUserSession(params);
    this.setHeaders();
  }

  private setUserSession(params: any) {
    if (isUserSession(params)) {
      return params;
    }
  }

  private appendAuthHeaders = (config: AxiosRequestConfig) => {
    if (this.session) {
      config.headers!["session_id"] = this.session.sessionId;
      config.headers!["user_id"] = this.session.userId;
    }
    return config;
  };

  private setHeaders() {
    instance.interceptors.request.use(this.appendAuthHeaders);
  }

  request<T>(route: string, payload: T) {
    return Promise.resolve(instance.post(route, payload));
  }
}

export default RequestHandler;
