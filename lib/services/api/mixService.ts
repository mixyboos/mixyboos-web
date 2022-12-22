import ApiClient from './apiClient';
import { MixModel } from '@lib/data/models';

class MixService extends ApiClient {
  getMixes = async (): Promise<Array<MixModel>> => {
    try {
      const result = await this._client.get('/mix');
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      console.log('authService', 'getMixes_error', err);
      if (![401, 400].includes(err?.response?.status)) throw new Error(err);
    }
    throw new Error('Unable to load mixes');
  };
  createMix = async (mix: MixModel): Promise<MixModel> => {
    try {
      const result = await this._client.post('/mix', mix);
      if (result?.status === 201) {
        return result.data;
      }
    } catch (err) {
      console.log('authService', 'getUser_error', err);
      if (err?.response?.status !== 401) throw new Error(err);
    }
    throw new Error('Unable to create mix');
  };
}

export default MixService;
