import {env} from "@/env";
import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  //add the browser cookies to the request if we're running on the server
  const runningOnServer = typeof window === "undefined";
  if (runningOnServer) {
    const cs = await import("next/headers");
    const cookieStore = cs.cookies();
    config.headers.Cookie = (await cookieStore).toString();
  } else {
    console.log('api-client', 'NOT RUNNING ON SERVER',);
  }
  return config;
});
export default api;
