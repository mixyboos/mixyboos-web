import ProfileModel from "@/lib/models/profile";
import axios from "axios";
import { AxiosError } from "axios";
const CHANGEME_API_URL = "https://mixyboos.dev.fergl.ie:5001";

const login = async (username: string, password: string) => {
  const response = await axios.post(
    `${CHANGEME_API_URL}/auth/login?useCookies=true`,
    {
      email: username,
      password: password,
    },
    { withCredentials: true }
  );
  return response;
};
const logout = async (): Promise<boolean> => {
  const response = await axios.delete(`${CHANGEME_API_URL}/account`, {
    withCredentials: true,
  });
  return response.status === 200;
};
const getProfile = async (): Promise<ProfileModel | null> => {
  try {
    const result = await axios.get(`${CHANGEME_API_URL}/profile`, {
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
