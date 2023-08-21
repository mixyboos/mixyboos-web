import UploadService from "@/lib/services/api/upload-service";
import { getFilename } from "@/lib/utils/fileUtils";
import axios, { type AxiosProgressEvent, type AxiosRequestConfig } from "axios";
import { StatusCodes } from "http-status-codes";
import React from "react";

interface IFileUploadProps {
  mixId: string;
  onError: (error: string) => void;
  onUploadStart: (fileName: string) => void;
  onUploadComplete: () => void;
  onUploadProgress: (total: number, loaded: number) => void;
}

const FileUpload = ({
  mixId,
  onError,
  onUploadStart,
  onUploadComplete,
  onUploadProgress,
}: IFileUploadProps) => {
  const startUpload = async (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    if (!event.currentTarget.files) return;
    if (!event.currentTarget.files[0]) return;

    const uploadService = new UploadService();
    const formData = new FormData();

    formData.append("file", event.currentTarget.files[0]);
    try {
      onUploadStart(getFilename(event.currentTarget.files[0].name));
      const result = await uploadService.uploadAudio(
        mixId,
        formData,
        onUploadProgress,
      );
      if (result) {
        onUploadComplete();
      } else {
        onError(
          "Error uploading file, please refresh your browser and try again!",
        );
      }
    } catch (err) {
      console.error("Upload", "Error", err);
      onError(
        "Error uploading file, please refresh your browser and try again!",
      );
    }
  };
  return (
    <label
      className="bg-primary text-primary-foreground border-blue hover:bg-primary/90 hover:text-primary-foreground/90 flex w-full cursor-pointer
                 flex-col items-center rounded-lg border px-4 py-6 uppercase
                 tracking-wide shadow-lg disabled:opacity-50"
    >
      <svg
        className="h-8 w-8"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
      </svg>
      <span className="mt-2 text-base leading-normal">gimme a file</span>
      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          startUpload(e).catch((err) => {
            console.error("FileUpload", "Error starting upload", err);
          });
        }}
      />
    </label>
  );
};
export default FileUpload;
