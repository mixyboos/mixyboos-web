import ApiClient from './apiClient';
import { ApiKeyModel, ShowModel } from '@lib/data/models';

class LiveService extends ApiClient {
  getStreamKey = async (): Promise<string> => {
    const keyDetails = await this._client.get<ApiKeyModel>('/profile/apikey');
    return keyDetails.data.apiKey;
  };

  getCurrentShow = async (): Promise<ShowModel | null> => {
    const result = await this._client.get<ShowModel>('/live/current');
    return result?.status === 200 ? result.data : null;
  };

  getShowInProgress = async (user: string): Promise<ShowModel | null> => {
    const result = await this._client.get<ShowModel>(`/live/current/${user}`);
    return result?.status === 200 ? result.data : null;
  };

  startShow = async (show: ShowModel): Promise<boolean> => {
    const result = await this._client.post('/live/start', show);
    return result?.status === 201;
  };
}

export default LiveService;
