import logger from "@/lib/logger";
import { ApiKeyModel, LiveShowModel } from "@/lib/models";
import api from "@/lib/services/api/api-client";

const LiveService = {
  getStreamKey: async (): Promise<string> => {
    const keyDetails = await api.get<ApiKeyModel>("/profile/apikey");
    return keyDetails.data.apiKey;
  },
  getStreamHost: async (): Promise<string> => {
    const keyDetails = await api.get<ApiKeyModel>("/profile/apikey");
    return keyDetails.data.apiKey;
  },
  getCurrentShow: async (): Promise<LiveShowModel | undefined> => {
    const result = await api.get<LiveShowModel>("/live/current");
    return result?.status === 200 ? result.data : undefined;
  },
  getShowInProgress: async (user: string): Promise<LiveShowModel | undefined> => {
    const result = await api.get<LiveShowModel>(`/live/current/${user}`);
    return result?.status === 200 ? result.data : undefined;
  },

  startShow: async (
    title: string,
    description: string,
    tags: string[]
  ): Promise<LiveShowModel | undefined> => {
    const result = await api.post("/live/start", {
      title,
      description,
      tags,
    });
    return result?.status === 201 ? result.data : undefined;
  },
};

export default LiveService;
