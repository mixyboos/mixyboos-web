import https from 'https';
import axios, { AxiosRequestConfig } from 'axios';
import AuthTokenModel from '../../../data/models/AuthTokenModel';
import { UserModel } from '../../../data/models';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  //TODO: MAKE SURE THIS IS TRUE IN DEV
  httpsAgent: new https.Agent({ rejectUnauthorized: !process.env.DEVELOPMENT as boolean })
};

const getUserProfile = async (accessToken: string): Promise<UserModel> => {
  apiClient.interceptors.request.use(async (config): Promise<AxiosRequestConfig> => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });
  const result = await apiClient.get('/profile/me');
  if (result.status === 200) {
    return result.data;
  }
  throw Error('Unable to get user profile');
};

const getAuthToken = async (user: string, password: string): Promise<AuthTokenModel> => {
  const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/connect/token`;

  const params = new URLSearchParams();
  params.append('username', user);
  params.append('password', password);
  params.append('grant_type', process.env.NEXT_PUBLIC_AUTH_GRANT_TYPE);
  params.append('scope', process.env.NEXT_PUBLIC_AUTH_SCOPE);
  params.append('client_id', process.env.NEXT_PUBLIC_AUTH_CLIENT_ID);
  const response = await apiClient.post(authUrl, params, config);
  if (response.status === 200) {
    return Promise.resolve(response.data);
  }
  return Promise.reject('Unable to log in');
};

const refreshAuthToken = async (refreshToken: string) => {
  const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/connect/token`;

  const params = new URLSearchParams();
  params.append('refresh_token', refreshToken);
  params.append('grant_type', process.env.NEXT_PUBLIC_AUTH_REFRESH_GRANT_TYPE);
  params.append('scope', process.env.NEXT_PUBLIC_AUTH_SCOPE);
  params.append('client_id', process.env.NEXT_PUBLIC_AUTH_CLIENT_ID);

  const response = await apiClient.post(authUrl, params, config);
  if (response.status === 200) {
    return Promise.resolve(response.data);
  }
  return Promise.reject('Unable to log in');
};

export { getUserProfile, getAuthToken, refreshAuthToken };
