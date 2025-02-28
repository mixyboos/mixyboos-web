import { AxiosError } from "axios";
import api from "@/lib/services/api/api-client";

const uploadAudio = async (
  mixId: string,
  formData: FormData,
  callback: (total: number, loaded: number) => void
): Promise<boolean> => {
  try {
    const result = await api.post(`/upload/${mixId}`, formData, {
      onUploadProgress: (e) => {
        callback(e.total ?? 0, e.loaded);
      },
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return result?.status === 201;
  } catch (err) {
    console.log("uploadService", "uploadAudio_error", err);
    if (err instanceof AxiosError) {
      if (![401, 400].includes(err.status as number)) throw new Error(err.message);
    }
  }
  return false;
};

const uploadImage = async (
  userId: string,
  file: File,
  imageSource: "mixes" | "shows" | "users",
  imageType: "headers" | "avatars" | ""
): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const it = imageType ? `&imageType=${imageType}` : "";
    const result = await api.post(
      `/upload/image/${userId}?imageSource=${imageSource}${it}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result?.status === 201;
  } catch (err) {
    console.log("uploadService", "uploadAudio_error", err);
    if (err instanceof AxiosError) {
      if (![401, 400].includes(err.status as number)) throw new Error(err.message);
    }
  }
  return false;
};

export { uploadAudio, uploadImage };
