import { MixModel } from "@/lib/models";
import { CreateMixModel } from "@/lib/models/mix";
import api from "@/lib/services/api/api-client";
import { AxiosError, AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";

const getMixes = async (): Promise<Array<MixModel>> => {
  try {
    const result: AxiosResponse<Array<MixModel>> = await api.get("/mix");
    if (result?.status === 200) {
      return result.data;
    }
  } catch (err) {
    console.log("mix-service.ts", "getMixes_error", err);
    if (err instanceof AxiosError) {
      if (![401, 400].includes(err.status as number)) throw new Error(err.message);
    }
  }
  throw new Error("Unable to load mixes");
};

const getMixesFeed = async (): Promise<MixModel[]> => {
  try {
    const result = await api.get("/mix/feed");
    if (result?.status === 200) {
      return result.data;
    }
  } catch (err) {
    console.log("userService", "getMixes_error", err);
    if (err instanceof AxiosError) {
      if (![401, 400].includes(err.status as number)) throw new Error(err.message);
    }
  }
  throw new Error("Unable to load mixes");
};

const getUserMixes = async (user: string): Promise<MixModel[]> => {
  try {
    const result = await api.get(`/mix/user?user=${user}`);
    if (result?.status === 200) {
      return result.data;
    }
    if (result?.status === 204) {
      return [];
    }
  } catch (err) {
    console.log("userService", "getMixes_error", err);
    if (err instanceof AxiosError) {
      if (![401, 400].includes(err.status as number)) throw new Error(err.message);
    }
  }
  throw new Error("Unable to load mixes");
};

const getByUserAndSlug = async (
  userSlug: string,
  mixSlug: string
): Promise<MixModel | undefined> => {
  try {
    const result = await api.get(`/mix/single?user=${userSlug}&mix=${mixSlug}`);
    if (result?.status === StatusCodes.OK) {
      return result.data;
    }
    if (result?.status === StatusCodes.NO_CONTENT) {
      return undefined;
    }
  } catch (err) {
    console.log("userService", "getMixes_error", err);
    if (err instanceof AxiosError) {
      if (
        ![StatusCodes.UNAUTHORIZED, StatusCodes.BAD_REQUEST].includes(
          err.status as number
        )
      )
        throw new Error(err.message);
    }
  }
  throw new Error("Unable to load mixes");
};

const createMix = async (mix: CreateMixModel): Promise<MixModel> => {
  try {
    const result = await api.post("/mix", mix);
    if (result?.status === 201) {
      return result.data;
    }
  } catch (err) {
    console.log("userService", "createMix_error", err);
    if (err instanceof AxiosError) {
      if (![401, 400].includes(err.status as number)) throw new Error(err.message);
    }
  }
  throw new Error("Unable to create mix");
};

const updateMix = async (mix: MixModel): Promise<MixModel> => {
  try {
    const result = await api.patch("/mix", mix);
    if (result?.status === 201) {
      return result.data;
    }
  } catch (err) {
    console.log("userService", "updateMix_error", err);
    if (err instanceof AxiosError) {
      if (![401, 400].includes(err.status as number)) {
        throw new Error(err.message);
      }
    }
  }
  throw new Error("Unable to create mix");
};

const toggleLike = async (mix: MixModel): Promise<MixModel> => {
  const result = await api.post(`/mix/togglelike?id=${mix.id}`);
  return result.data as MixModel;
};

const deleteMix = async (mix: MixModel): Promise<boolean> => {
  try {
    const result = await api.delete(`/mix?id=${mix.id}`);
    return result.status === 200;
  } catch (err) {
    console.log("userService", "deleteMix_error", err);
    if (err instanceof AxiosError) {
      if (![401, 400].includes(err.status as number)) {
        throw new Error(err.message);
      }
    }
  }
  throw new Error("Unable to create mix");
};

const getMixAudioUrl = async (mix: MixModel): Promise<string> => {
  try {
    const result = await api.get(`/mix/audiourl?id=${mix.id}`);
    return result.data;
  } catch (err) {
    console.log("userService", "getMixAudioUrl_error", err);
    if (err instanceof AxiosError) {
      if (![401, 400].includes(err.status as number)) {
        throw new Error(err.message);
      }
    }
  }
  throw new Error("Unable to get mix audio url");
};

export {
  getMixes,
  getMixesFeed,
  getUserMixes,
  getByUserAndSlug,
  createMix,
  updateMix,
  toggleLike,
  getMixAudioUrl,
  deleteMix,
};
