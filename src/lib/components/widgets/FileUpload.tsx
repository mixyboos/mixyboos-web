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
    if (!event.currentTarget.files[0]) return;

    const formData = new FormData();

    formData.append("file", event.currentTarget.files[0]);
    formData.append("mixId", mixId);
    try {
      const options: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          onUploadProgress(progressEvent.total ?? 0, progressEvent.loaded);
        },
      };
      onUploadStart(getFilename(event.currentTarget.files[0].name));
      const result = await axios.post("/api/upload", formData, options);

      if (result.status === StatusCodes.OK) {
        onUploadComplete();
      }
    } catch (err) {
      console.error("Upload", "Error", err);
      onError(
        "Error uploading file, please refresh your browser and try again!"
      );
    }
  };
  return (
    <label
      className="w-full flex flex-col items-center px-4 py-6 bg-primary text-primary-foreground
                 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer
                 hover:bg-primary/90 disabled:opacity-50 hover:text-primary-foreground/90"
    >
      <svg
        className="w-8 h-8"
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
