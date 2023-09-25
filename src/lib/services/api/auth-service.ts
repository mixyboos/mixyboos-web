import { AxiosError } from "axios";
import ApiService from "./api-service";
import type { AuthTokenModel, ProfileModel } from "@/lib/models";
import logger from "@/lib/logger";

class AuthService extends ApiService {
  getProfile = async (): Promise<ProfileModel | undefined> => {
    try {
      const result = await this._client.get("/profile/me");
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("authService", "getUser_error", err);
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    return undefined;
  };

  getAuthToken = async (
    user: string,
    password: string,
  ): Promise<AuthTokenModel> => {
    logger.info({
      getAuthToken: {
        user,
        password,
        url: process.env.API_URL,
      },
    });

    const authUrl = `${process.env.API_URL as string}/auth/login`;
    const response = await this._client.post(authUrl, {
      email: user,
      password,
    });
    logger.info({
      getAuthTokenResponse: {
        code: response.status,
        description: response.statusText,
        url: process.env.API_URL,
      },
    });
    if (response?.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject("Unable to log in");
  };

  refreshAuthToken = async (refreshToken: string) => {
    const authUrl = `${process.env.API_URL}/connect/token`;

    const params = new URLSearchParams();
    params.append("refresh_token", refreshToken);
    params.append("grant_type", process.env.AUTH_REFRESH_GRANT_TYPE as string);
    params.append("scope", process.env.AUTH_SCOPE as string);
    params.append("client_id", process.env.AUTH_CLIENT_ID as string);

    const response = await this._client.post(
      authUrl,
      params,
      this.noauthConfig,
    );
    if (response?.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject("Unable to log in");
  };
  registerUser = async (
    email: string,
    password: string,
    confirmPassword: string,
    username: string = "",
  ): Promise<boolean> => {
    const url = "/account/register";
    const result = await this._client.post(
      url,
      { username: email, password, confirmPassword, displayName: username },
      this.jsonConfig,
    );

    if (result.status === 200) {
      return true;
    } else if (result.status === 400) {
      console.log("authService", "registerUser", result);
    }
    return false;
  };

  loginUser = async (
    username: string,
    password: string,
  ): Promise<ProfileModel | null> => {
    const url = "/connect/token";

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    params.append("grant_type", process.env.AUTH_GRANT_TYPE as string);
    params.append("scope", process.env.AUTH_SCOPE as string);
    params.append("client_id", process.env.AUTH_CLIENT_ID as string);

    try {
      const result = await this._client.post(url, params, this.noauthConfig);
      if (result?.status === 200) {
        const model: AuthTokenModel = result.data.token;
        const user: ProfileModel = result.data.user;
        console.log("authService", "loginUser", result);
        // _storeToken(model);
        return user;
      }
    } catch (err) {
      console.log("authService", "Error logging in user", err);
    }
    return null;
  };
}

class AuthFailed extends Error {}

export { AuthFailed };
export default AuthService;
