'use client';
import Progress from '@lib/components/progress';
import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MixDetailsForm from './DetailsForm';
import FileUpload from './FileUpload';
import { MdOutlineErrorOutline } from 'react-icons/md';
enum CreateState {
  new,
  uploading,
  processing,
  editing,
  done,
  error,
}

const MixCreate = () => {
  const [createState, setCreateState] = useState(CreateState.new);
  const [errors, setErrors] = useState('This is an error');
  const [fileName, setFilename] = useState('');
  const [percentageUploaded, setPercentageUploaded] = useState(0);
  const [mixId] = useState(uuidv4());

  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center w-full mx-auto">
        {errors && (
          <div className="flex w-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-center w-12 bg-red-500">
              <MdOutlineErrorOutline className="w-6 h-6 text-white fill-current" />
            </div>
            <div className="px-4 py-2 -mx-3">
              <div className="mx-3">
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Ooopsies...
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  {errors}
                </p>
              </div>
            </div>
          </div>
        )}
        {createState === CreateState.uploading && (
          <Progress
            percentage={percentageUploaded}
            title="Uploading audio"
          />
        )}
        {createState === CreateState.processing ||
          createState === CreateState.new}
        {createState === CreateState.new ? (
          <FileUpload
            mixId={mixId}
            onError={(e) => {
              setCreateState(CreateState.error);
              setErrors(e);
            }}
            onUploadComplete={() => setCreateState(CreateState.processing)}
            onUploadStart={(fileName) => {
              setFilename(fileName);
              setCreateState(CreateState.uploading);
            }}
            onUploadProgress={(total, loaded) =>
              setPercentageUploaded(Math.round((loaded * 100) / total))
            }
          />
        ) : (
          createState !== CreateState.error && (
            <MixDetailsForm
              mixId={mixId}
              mixTitle={fileName}
            />
          )
        )}
      </div>
    </React.Fragment>
  );
};
export default MixCreate;
