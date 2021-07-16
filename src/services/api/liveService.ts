import { ApiKeyModel, ShowModel } from '../../data/models';
import ApiClient from './apiClient';

class LiveService extends ApiClient {
  getStreamKey = async (): Promise<string> => {
    debugger;
    const keyDetails = await this._client.get<ApiKeyModel>('/profile/apikey');
    return keyDetails.data.apiKey;
  };

  getCurrentShow = async (): Promise<ShowModel> => {
    const result = await this._client.get<ShowModel>('/live/current');
    return result.status === 200 ? result.data : null;
  };

  getShowInProgress = async (user: string): Promise<ShowModel> => {
    const result = await this._client.get<ShowModel>(`/live/current/${user}`);
    return result.status === 200 ? result.data : null;
  };

  startShow = async (title: string): Promise<boolean> => {
    const result = await this._client.post('/live/start', {
      title
    });

    return result.status === 201;
  };
}

export default LiveService;
