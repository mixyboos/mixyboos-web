import type { ProfileModel } from "@/lib/models";
import ApiService from "./api-service";
import logger from "@/lib/logger";

class ProfileService extends ApiService {
  /**
   * Get the currently logged in user's profile
   */
  getProfile = async (): Promise<ProfileModel | undefined> => {
    try {
      const results = await this._client.get("/profile/me");
      if (results.status === 200) {
        return results.data;
      }
    } catch (err) {
      logger.error("profile-service.ts", "Unable to get user's profile.", err);
    }
    return undefined;
  };

  getProfileBySlug = async (slug: string): Promise<ProfileModel | undefined> => {
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
    } catch (err) {}
    return undefined;
  };
}

export default ProfileService;
