import UploadService from '@lib/services/api/uploadService';
import { FaFileAudio } from 'react-icons/fa';
import { VscCloudUpload } from 'react-icons/vsc';
import React from 'react';
import { getFileNameFromInput } from '@lib/services/utils/fileUtils';

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
    const uploadServer = new UploadService();
    const url = '/upload/audio';
    const formData = new FormData();
    if (!event.currentTarget.files) return;

    formData.append('id', mixId);
    // formData.append('file', event.target.value files[0])
    formData.append('file', event.currentTarget.files[0]);
    try {
      onUploadStart(getFileNameFromInput(event.currentTarget.files[0].name));
      const result = await uploadServer.uploadAudio(
        mixId,
        formData,
        onUploadProgress
      );
      onUploadComplete();
    } catch (err) {
      console.error('Upload', 'Error', err);
      onError(
        'Error uploading file, please refresh your browser and try again!'
      );
    }
  };
  return (
    <React.Fragment>
      <div className="w-1/2 p-4 bg-white shadow-lg shadow-gray-200 rounded-2xl lg:w-3/4">
        <div className="flex items-center">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-white rounded-lg bg-gradient-to-br from-pink-500 to-voilet-500">
            <FaFileAudio
              className="w-8 h-8"
              fill="currentColor"
            />
          </div>
          <div className="flex-shrink-0 ml-3">
            <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
              Choose your file
            </span>
            <h3 className="text-base font-normal text-gray-500">
              And we'll do our best to process it.
            </h3>
          </div>
          <div className="flex items-center justify-end flex-1 w-0 ml-5 text-base font-bold">
            <label className="flex flex-col items-center w-64 px-4 py-6 tracking-wide text-gray-600 uppercase bg-white border rounded-lg shadow-lg cursor-pointer text-blue border-blue hover:bg-blue hover:text-gray-400">
              <VscCloudUpload
                className="w-8 h-8"
                fill="currentColor"
              />
              <span className="mt-2 text-base leading-normal">Browse</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => startUpload(e)}
              />
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FileUpload;
