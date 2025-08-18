import api from "@/lib/services/api/api-client";
import logger from "@/lib/logger";
import { UserModel } from "@/lib/models/user";

const UserService = {
  getUserBySlug: async (slug: string): Promise<UserModel | undefined> => {
    try {
      const results = await api.get(`/user?slug=${slug}`);
      if (results.status === 200) {
        return results.data;
      }
    } catch (err) {
      logger.errorLog(
        "profile-service.ts",
        "Unable to get user's stream key.",
        err
      );
    }
    return undefined;
  },
};
export default UserService;
