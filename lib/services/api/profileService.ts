import { UserModel } from '@lib/data/models';
import ApiClient from '@lib/services/api/apiClient';

class ProfileService extends ApiClient {
  getProfileBySlug = async (slug: string): Promise<UserModel | undefined> => {
    try {
      const results = await this._client.get(`/profile?slug=${slug}`);
      if (results.status === 200) {
        return results.data;
      }
    } catch {
    }
    return undefined;
  };
}

export default ProfileService;
