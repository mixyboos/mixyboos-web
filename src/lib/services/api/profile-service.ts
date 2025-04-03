import type { ApiKeyModel, ProfileModel } from "@/lib/models";
import logger from "@/lib/logger";
import { AxiosError } from "axios";
import api from "@/lib/services/api/api-client";

const ProfileService = {
  getStreamKey: async (): Promise<ApiKeyModel | undefined> => {
    try {
      const results = await api.get("/profile/apikey");
      if (results.status === 200) {
        return results.data;
      }
    } catch (err) {
      logger.error("profile-service.ts", "Unable to get user's stream key.", err);
    }
    return undefined;
  },
  getProfile: async (): Promise<ProfileModel | undefined> => {
    try {
      const result = await api.get("/profile");
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("authService", "getProfile_error", err);
        if (![401, 400].includes(err.status as number)) throw new Error(err.message);
      }
    }
    return undefined;
  },

  getProfileBySlug: async (slug: string): Promise<ProfileModel | undefined> => {
    try {
      const results = await api.get(`/profile?slug=${slug}`);
      if (results.status === 200) {
        return results.data;
      }
    } catch {}
    return undefined;
  },

  toggleFollow: async (slug: string): Promise<boolean> => {
    const result = await api.post(`/profile/togglefollow?slug=${slug}`);
    return result.status === 200;
  },

  updateProfile: async (profile: ProfileModel): Promise<ProfileModel | undefined> => {
    try {
      const result = await api.post(`/profile`, profile);

      return result.data as ProfileModel;
    } catch (err) {
      logger.error("profile-service", "updateProfile", profile, err);
    }
    return undefined;
  },
};
export default ProfileService;
