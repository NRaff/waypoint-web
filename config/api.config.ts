import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "not-implemented",
  timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});

export default instance;
