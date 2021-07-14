import ApiClient from './apiClient';

export interface IDebugData {
  netCoreVersion: string
  osVersion: string
}

class DebugService extends ApiClient {
  getDebugInfo = async (): Promise<IDebugData> => {
    const result = await this._client.get('/debug');

    return result.data as IDebugData;
  };
}

export { DebugService };
