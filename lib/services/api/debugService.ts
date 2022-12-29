import ApiClient from './apiClient';
import { OsInfoModel } from '@lib/data/models';

class DebugService extends ApiClient {
  getOsInfo = async (): Promise<OsInfoModel> => {
    try {
      const result = await this._client.get('/debug');
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      console.log('DebugService', 'getOsInfo', err);
    }
    throw new Error('FUCK!');
  };
}

export default DebugService;
