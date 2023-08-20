import type { UserModel } from "@/lib/models";
import ApiService from "./api-service";
import logger from "@/lib/logger";

class ProfileService extends ApiService {
  /**
   * Get the currently logged in user's profile
   */
  getProfile = async (): Promise<UserModel | undefined> => {
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

  getProfileBySlug = async (slug: string): Promise<UserModel | undefined> => {
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
    profile: UserModel,
  ): Promise<UserModel | undefined> => {
    try {
      const result = await this._client.post(
        `/profile`,
        profile,
        this.jsonConfig,
      );

      return result.data as UserModel;
    } catch (err) {}
    return undefined;
  };
}

export default ProfileService;
