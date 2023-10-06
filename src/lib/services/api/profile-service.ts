import type { ApiKeyModel, ProfileModel } from "@/lib/models";
import ApiService from "./api-service";
import logger from "@/lib/logger";
import { AxiosError } from "axios";

class ProfileService extends ApiService {
  getStreamKey = async (): Promise<ApiKeyModel | undefined> => {
    try {
      const results = await this._client.get("/profile/apikey");
      if (results.status === 200) {
        return results.data;
      }
    } catch (err) {
      logger.error(
        "profile-service.ts",
        "Unable to get user's stream key.",
        err,
      );
    }
    return undefined;
  };
  /**
   * Get the currently logged in user's profile
   */
  getProfile = async (): Promise<ProfileModel | undefined> => {
    try {
      const result = await this._client.get("/profile");
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

  getProfileBySlug = async (
    slug: string,
  ): Promise<ProfileModel | undefined> => {
    try {
      const results = await this._client.get(`/profile?slug=${slug}`);
      if (results.status === 200) {
        return results.data;
      }
    } catch {}
    return undefined;
  };

  toggleFollow = async (slug: string): Promise<boolean> => {
    const result = await this._client.post(
      `/profile/togglefollow?slug=${slug}`,
    );
    return result.status === 200;
  };

  updateProfile = async (
    profile: ProfileModel,
  ): Promise<ProfileModel | undefined> => {
    try {
      const result = await this._client.post(
        `/profile`,
        profile,
        this.jsonConfig,
      );

      return result.data as ProfileModel;
    } catch (err) {
      logger.error("profile-service", "updateProfile", profile, err);
    }
    return undefined;
  };
}

export default ProfileService;
