import axios, { AxiosInstance } from 'axios';
import https from 'https';

class ApiClient {
  protected readonly _client: AxiosInstance;
  protected readonly _token: string | undefined;
  protected readonly jsonConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    //TODO: MAKE SURE THIS IS TRUE IN DEV
    httpsAgent: new https.Agent({
      rejectUnauthorized: !process.env.DEVELOPMENT as boolean,
    }),
  };
  protected readonly noauthConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    //TODO: MAKE SURE THIS IS TRUE IN DEV
    httpsAgent: new https.Agent({
      rejectUnauthorized: !process.env.DEVELOPMENT as boolean,
    }),
  };
  constructor(token?: string) {
    this._token = token;
    this._client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL as string,
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
        Accept: 'application/json',
      };
    }
    return config;
  };
}

export default ApiClient;
