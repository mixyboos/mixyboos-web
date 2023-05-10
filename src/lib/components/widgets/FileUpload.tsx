import { FaFileAudio } from "react-icons/fa";
import { VscCloudUpload } from "react-icons/vsc";
import React from "react";
import { getFileNameFromInput } from "@/lib/services/utils/fileUtils";

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

    // const uploadService = new UploadService();

    const formData = new FormData();

    formData.append("file", event.currentTarget.files[0]);
    try {
      onUploadStart(getFileNameFromInput(event.currentTarget.files[0].name));
      //   const result = await uploadService.uploadAudio(
      //     mixId,
      //     formData,
      //     onUploadProgress
      //   );
      onUploadComplete();
    } catch (err) {
      console.error("Upload", "Error", err);
      onError(
        "Error uploading file, please refresh your browser and try again!"
      );
    }
  };
  return (
    <React.Fragment>
      <div className="shadow-cocoa-100 rounded-2xl p-4 shadow-md dark:shadow-gray-400">
        <div className="flex items-center">
          <div className="bg-cocoa-500 dark:bg-cerise-400 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-white">
            <FaFileAudio className="h-8 w-8" fill="currentColor" />
          </div>
          <div className="ml-3 flex-shrink-0">
            <span className="text-2xl font-bold leading-none text-gray-900 dark:text-gray-200 sm:text-3xl">
              Choose your file
            </span>
            <h3 className="text-base font-normal text-gray-500">
              And we&lsquo;ll do our best to process it.
            </h3>
          </div>
          <div className="ml-5 flex w-0 flex-1 items-center justify-end text-base font-bold">
            <label className="text-blue border-blue hover:bg-blue flex w-64 cursor-pointer flex-col items-center rounded-lg border bg-white px-4 py-6 uppercase tracking-wide text-gray-600 shadow-lg hover:text-gray-400">
              <VscCloudUpload className="h-8 w-8" fill="currentColor" />
              <span className="mt-2 text-base leading-normal">Browse</span>
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FileUpload;
