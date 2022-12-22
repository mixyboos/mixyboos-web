import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import { CtxOrReq } from 'next-auth/client/_utils';

class ApiClient {
  protected readonly _client: AxiosInstance;
  protected readonly _token: string | undefined;

  constructor(token?: string) {
    this._token = token;
    this._client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL as string
    });
    this._client.interceptors.request.use(
      this._tokenRequestInterceptor,
      (error) => {
        Promise.reject(error);
      }
    );
  }

  private _tokenRequestInterceptor = async (config: any) => {
    const token = this._token;
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };
    }
    return config;
  };
}

export default ApiClient;
