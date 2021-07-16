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

//
// //token refresher
// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     let tokens = await _getTokens();
//     if (
//       tokens &&
//       tokens.refreshToken &&
//       error.response.status === 401 && !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       //   const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/connect/token`
//       const refreshUrl = process.env.NEXT_PUBLIC_API_URL + '/connect/token';
//       const params = new URLSearchParams();
//       params.append(
//         'grant_type',
//         process.env.NEXT_PUBLIC_AUTH_REFRESH_GRANT_TYPE as string
//       );
//       params.append('client_id', process.env.NEXT_PUBLIC_AUTH_CLIENT_ID as string);
//       params.append('refresh_token', tokens.refreshToken);
//       const headers = {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded'
//       };
//       //use axios here so bearer token isn't sent
//       return axios.post(refreshUrl, params).then(
//         (res) => {
//           if (res.status === 200) {
//             console.log('APICLIENT', 'SETTING KEY', res.data);
//             console.log('Access token refreshed!');
//             return apiClient(originalRequest);
//           }
//         },
//         (err) => {
//           console.log('apiClient', 'Error refreshing token', err);
//         }
//       );
//     }
//     return Promise.reject(error);
//   }
// );
//
// export default apiClient;
//
// // Request interceptor for API calls
//
// async (config) => {
//   const tokens = await _getTokens();
//   if (tokens && tokens.accessToken) {
//     config.headers = {
//       Authorization: `Bearer ${tokens.accessToken}`,
//       Accept: 'application/json'
//     };
//   }
//   return config;
// },
//   (error) => {
//     Promise.reject(error);
//   };
// //token refresher
// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     let tokens = await _getTokens();
//     if (
//       tokens &&
//       tokens.refreshToken &&
//       error.response.status === 401 && !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       //   const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/connect/token`
//       const refreshUrl = process.env.NEXT_PUBLIC_API_URL + '/connect/token';
//       const params = new URLSearchParams();
//       params.append(
//         'grant_type',
//         process.env.NEXT_PUBLIC_AUTH_REFRESH_GRANT_TYPE as string
//       );
//       params.append('client_id', process.env.NEXT_PUBLIC_AUTH_CLIENT_ID as string);
//       params.append('refresh_token', tokens.refreshToken);
//       const headers = {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded'
//       };
//       //use axios here so bearer token isn't sent
//       return axios.post(refreshUrl, params).then(
//         (res) => {
//           if (res.status === 200) {
//             console.log('APICLIENT', 'SETTING KEY', res.data);
//             console.log('Access token refreshed!');
//             return apiClient(originalRequest);
//           }
//         },
//         (err) => {
//           console.log('apiClient', 'Error refreshing token', err);
//         }
//       );
//     }
//     return Promise.reject(error);
//   }
// );
//
// export default apiClient;
