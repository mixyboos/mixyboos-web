import ProfileModel from "@/lib/models/profile";
import axios from "axios";
import { AxiosError } from "axios";
const CHANGEME_API_URL = "https://mixyboos.dev.fergl.ie:5001";
const instance = axios.create({
  withCredentials: true,
  baseURL: CHANGEME_API_URL,
});

const login = async (username: string, password: string) => {
  const response = await instance.post(
    "/auth/login?useCookies=true",
    {
      email: username,
      password: password,
    },
    { withCredentials: true }
  );
  return response;
};
const logout = async (): Promise<boolean> => {
  const response = await instance.delete("/account/logout", {
    withCredentials: true,
  });
  if (response.status === 200) {
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  }
  return response.status === 200;
};
const getProfile = async (): Promise<ProfileModel | null> => {
  try {
    const result = await instance.get("/profile", {
      withCredentials: true,
    });
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
  return null;
};

export { login, getProfile, logout };
