import type { ApiKeyModel, LiveShowModel } from "@/lib/models";
import ApiService from "./api-service";

class LiveService extends ApiService {
  getStreamKey = async (): Promise<string> => {
    const keyDetails = await this._client.get<ApiKeyModel>("/profile/apikey");
    return keyDetails.data.apiKey;
  };
  getStreamHost = async (): Promise<string> => {
    const keyDetails = await this._client.get<ApiKeyModel>("/profile/apikey");
    return keyDetails.data.apiKey;
  };

  getCurrentShow = async (): Promise<LiveShowModel | undefined> => {
    const result = await this._client.get<LiveShowModel>("/live/current");
    return result?.status === 200 ? result.data : undefined;
  };

  getMyShowInProgress = async (): Promise<LiveShowModel | undefined> => {
    const result = await this._client.get<LiveShowModel>("/live/current");
    return result?.status === 200 ? result.data : undefined;
  };

  getShowInProgress = async (
    user: string,
  ): Promise<LiveShowModel | undefined> => {
    const result = await this._client.get<LiveShowModel>(
      `/live/current/${user}`,
    );
    return result?.status === 200 ? result.data : undefined;
  };

  startShow = async (
    title: string,
    description: string,
    tags: string[],
  ): Promise<LiveShowModel | undefined> => {
    const result = await this._client.post("/live/start", {
      title,
      description,
      tags,
    });
    return result?.status === 201 ? result.data : undefined;
  };
}

export default LiveService;
