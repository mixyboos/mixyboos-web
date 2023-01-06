import ApiClient from '@lib/services/api/apiClient';
import { OsInfoModel } from '@lib/data/models';

class TagService extends ApiClient {
  searchTags = async (query: string): Promise<string[]> => {
    const results = await this._client.get(`/tag/search?query=${query}`);

    return results.data;
  };
}

export default TagService;
