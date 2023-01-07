import ApiClient from './apiClient';
import { AxiosError } from 'axios';

class UploadService extends ApiClient {
  uploadAudio = async (
    id: string,
    formData: FormData,
    callback: (total: number, loaded: number) => void
  ): Promise<string> => {
    try {
      const result = await this._client.post(`/upload`, formData, {
        onUploadProgress: (e) => {
          console.log('Upload', 'progress', e);
          callback(e.total ?? 0, e.loaded);
        },
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      if (result?.status === 201) {
        return result.data;
      }
    } catch (err) {
      console.log('authService', 'getUser_error', err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    throw new Error('Unable to load mixes');
  };
}

export default UploadService;
