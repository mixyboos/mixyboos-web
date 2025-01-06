import { env } from "@/env";
import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  //add the browser cookies to the request if we're running on the server
  const runningOnServer = typeof window === "undefined";
  if (runningOnServer) {
    const cs_server = await import("next/headers");
    const cookieStore = cs_server.cookies();
    config.headers.Cookie = (await cookieStore).toString();
  } else {
    console.log("api-client", "NOT RUNNING ON SERVER");
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      //redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// const hasAuthCookie = (): boolean => {
//   console.log("api-client", "env", env.NEXT_PUBLIC_COOKIE_NAME);
//   console.log("api-client", "cookie", document.cookie);
//   const result =
//     document.cookie.indexOf(env.NEXT_PUBLIC_COOKIE_NAME || ".Mixyboos.Authentication") >
//     -1;
//   return true;
// };
export default api;
// export { hasAuthCookie };
