import axios, { AxiosInstance } from 'axios';
import { CtxOrReq, getSession } from 'next-auth/client';

class ApiClient {
  protected readonly _client: AxiosInstance;
  protected readonly _token: string;
  protected readonly _context: CtxOrReq;


  constructor(contextOrToken: CtxOrReq | string | null) {
    if ((contextOrToken as string)) {
      this._token = contextOrToken as string;
    }
    if ((contextOrToken as CtxOrReq)) {
      this._context = contextOrToken as CtxOrReq;
    }
    this._client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL as string
    });
    this._client.interceptors.request.use(this._tokenRequestInterceptor,
      (error) => {
        Promise.reject(error);
      });
  }

  private _getAccessToken = async () => (await getSession(this._context))?.accessToken;

  private _tokenRequestInterceptor =
    async (config) => {
      if (this._context || this._token) {
        const token = this._token ? this._token : await this._getAccessToken();
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          };
        }
      }
      return config;
    };

}

export default ApiClient;
