import { AxiosError } from "axios";
import ApiService from "./api-service";
import { type MixModel } from "@/lib/models";

class MixService extends ApiService {
  getMixes = async (): Promise<Array<MixModel>> => {
    try {
      const result = await this._client.get("/mix");
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      console.log("authService", "getMixes_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    throw new Error("Unable to load mixes");
  };

  getMixesFeed = async (): Promise<MixModel[]> => {
    try {
      const result = await this._client.get("/mix/feed");
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      console.log("authService", "getMixes_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    throw new Error("Unable to load mixes");
  };
  getUserMixes = async (user: string): Promise<MixModel[]> => {
    try {
      const result = await this._client.get(`/mix/user?user=${user}`);
      if (result?.status === 200) {
        return result.data;
      }
      if (result?.status === 204) {
        return [];
      }
    } catch (err) {
      console.log("authService", "getMixes_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    throw new Error("Unable to load mixes");
  };

  getByUserAndSlug = async (
    userSlug: string,
    mixSlug: string,
  ): Promise<MixModel> => {
    try {
      const result = await this._client.get(
        `/mix/single?user=${userSlug}&mix=${mixSlug}`,
      );
      if (result?.status === 200) {
        return result.data;
      }
    } catch (err) {
      console.log("authService", "getMixes_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    throw new Error("Unable to load mixes");
  };

  createMix = async (mix: MixModel): Promise<MixModel> => {
    try {
      const result = await this._client.post("/mix", mix);
      if (result?.status === 201) {
        return result.data;
      }
    } catch (err) {
      console.log("authService", "getUser_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    throw new Error("Unable to create mix");
  };

  updateMix = async (mix: MixModel): Promise<MixModel> => {
    try {
      const result = await this._client.patch("/mix", mix);
      if (result?.status === 201) {
        return result.data;
      }
    } catch (err) {
      console.log("authService", "getUser_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number)) {
          throw new Error(err as any);
        }
      }
    }
    throw new Error("Unable to create mix");
  };
  addLike = async (mix: MixModel): Promise<boolean> => {
    const result = await this._client.post(`/mix/addlike?mixId=${mix.id}`);
    return result.status === 200;
  };
  deleteMix = async (mix: MixModel): Promise<boolean> => {
    try {
      const result = await this._client.delete(`/mix?id=${mix.id}`);
      return result.status === 200;
    } catch (err) {
      console.log("authService", "getUser_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number)) {
          throw new Error(err as any);
        }
      }
    }
    throw new Error("Unable to create mix");
  };
  getMixAudioUrl = async (mix: MixModel): Promise<string> => {
    try {
      const result = await this._client.get(`/mix/audiourl?id=${mix.id}`);
      return result.data;
    } catch (err) {
      console.log("authService", "getUser_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number)) {
          throw new Error(err as any);
        }
      }
    }
    throw new Error("Unable to get mix audio url");
  };
}

export default MixService;
