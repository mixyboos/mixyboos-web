import ProfileModel from "@/lib/models/profile";
import api from "@/lib/services/api/api-client";
import { AxiosError } from "axios";

const login = async (username: string, password: string) => {
  const response = await api.post(
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
  const response = await api.delete("/account/logout", {
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
    const result = await api.get("/profile", {
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
