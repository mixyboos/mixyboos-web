import { AxiosError } from "axios";
import ApiService from "./api-service";

class UploadService extends ApiService {
  uploadAudio = async (
    id: string,
    formData: FormData,
    callback: (total: number, loaded: number) => void,
  ): Promise<boolean> => {
    try {
      const result = await this._client.post(`/upload/${id}`, formData, {
        onUploadProgress: (e) => {
          callback(e.total ?? 0, e.loaded);
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      return result?.status === 201;
    } catch (err) {
      console.log("authService", "getUser_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    return false;
  };
  uploadImage = async (
    id: string,
    formData: FormData,
    imageSource: "MixImage" | "ShowImage" | "UserImage",
    imageType: "headers" | "avatars" | undefined,
  ): Promise<boolean> => {
    try {
      const it = imageType ? `&imageType=${imageType}` : "";
      const result = await this._client.post(
        `/upload/image/${id}?imageSource=${imageSource}${it}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        },
      );
      return result?.status === 201;
    } catch (err) {
      console.log("authService", "getUser_error", err);
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number))
          throw new Error(err as any);
      }
    }
    return false;
  };
}

export default UploadService;
