import logger from "@/lib/logger";
import axios, { type AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

class ApiService {
  protected readonly _client: AxiosInstance;
  protected readonly jsonConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  protected readonly noauthConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  private readonly _token?: string;

  constructor(token?: string) {
    //we should only pass this from server pages
    this._token = token;
    logger.debug("apiClient", "ctor", process.env.NEXT_PUBLIC_API_URL);
    this._client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL as string,
    });
    this._client.interceptors.request.use(
      this._tokenRequestInterceptor,
      (error) => {
        Promise.reject(error);
      },
    );
  }

  private _tokenRequestInterceptor = async (config: any) => {
    const session = await getSession();
    logger.debug("api-service", "_tokenRequestInterceptor__session", session);
    if (session || this._token) {
      config.headers = {
        Authorization: `Bearer ${session ? session.token : this._token}`,
        Accept: "application/json",
      };
    }
    return config;
  };
}

export default ApiService;
