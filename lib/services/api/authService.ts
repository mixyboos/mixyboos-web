import https from 'https';
import ApiClient from './apiClient';
import { AuthTokenModel, UserModel } from '@lib/data/models';

class AuthService extends ApiClient {
  noauthConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    //TODO: MAKE SURE THIS IS TRUE IN DEV
    httpsAgent: new https.Agent({ rejectUnauthorized: !process.env.DEVELOPMENT as boolean })
  };

  getUser = async (): Promise<UserModel> => {
    try {
      const result = await this._client.get('/profile/me');
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      console.log('authService', 'getUser_error', err);
      if (![401, 400].includes(err?.response?.status)) throw new Error(err);
    }
    throw new AuthFailed('Authentication failed');
  };

  getAuthToken = async (user: string, password: string): Promise<AuthTokenModel> => {
    const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/connect/token`;

    const params = new URLSearchParams();
    params.append('username', user);
    params.append('password', password);
    params.append('grant_type', process.env.NEXT_PUBLIC_AUTH_GRANT_TYPE as string);
    params.append('scope', process.env.NEXT_PUBLIC_AUTH_SCOPE as string);
    params.append('client_id', process.env.NEXT_PUBLIC_AUTH_CLIENT_ID as string);
    const response = await this._client.post(authUrl, params, this.noauthConfig);
    if (response?.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject('Unable to log in');
  };

  refreshAuthToken = async (refreshToken: string) => {
    const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/connect/token`;

    const params = new URLSearchParams();
    params.append('refresh_token', refreshToken);
    params.append('grant_type', process.env.NEXT_PUBLIC_AUTH_REFRESH_GRANT_TYPE as string);
    params.append('scope', process.env.NEXT_PUBLIC_AUTH_SCOPE as string);
    params.append('client_id', process.env.NEXT_PUBLIC_AUTH_CLIENT_ID as string);

    const response = await this._client.post(authUrl, params, this.noauthConfig);
    if (response?.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject('Unable to log in');
  };

  loginUser = async (username: string, password: string): Promise<UserModel | null> => {
    const url = '/connect/token';
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', process.env.NEXT_PUBLIC_AUTH_GRANT_TYPE as string);
    params.append('scope', process.env.NEXT_PUBLIC_AUTH_SCOPE as string);
    params.append('client_id', process.env.NEXT_PUBLIC_AUTH_CLIENT_ID as string);

    try {
      const result = await this._client.post(url, params, config);
      if (result?.status === 200) {
        const model: AuthTokenModel = result.data.token;
        const user: UserModel = result.data.user;
        console.log('authService', 'loginUser', result);
        // _storeToken(model);
        return user;
      }
    } catch (err) {
      console.log('authService', 'Error logging in user', err);
    }
    return null;
  };
}

class AuthFailed extends Error {
}

export { AuthFailed };
export default AuthService;
