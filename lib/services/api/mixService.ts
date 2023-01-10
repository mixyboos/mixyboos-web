import ApiClient from './apiClient';
import { MixModel } from '@lib/data/models';
import { AxiosError } from 'axios';

class MixService extends ApiClient {
  getMixes = async (): Promise<Array<MixModel>> => {
    try {
      const result = await this._client.get('/mix');
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      console.log('authService', 'getMixes_error', err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    throw new Error('Unable to load mixes');
  };
  getMixesFeed = async (): Promise<Array<MixModel>> => {
    try {
      const result = await this._client.get('/mix/feed');
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      console.log('authService', 'getMixes_error', err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    throw new Error('Unable to load mixes');
  };
  getByUserAndSlug = async (
    userSlug: string,
    mixSlug: string
  ): Promise<MixModel> => {
    try {
      const result = await this._client.get(
        `/mix/single?user=${userSlug}&mix=${mixSlug}`
      );
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      console.log('authService', 'getMixes_error', err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
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
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    throw new Error('Unable to create mix');
  };
}

export default MixService;
