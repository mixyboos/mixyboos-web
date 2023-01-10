'use client';
import Progress from '@lib/components/progress';
import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MixDetailsForm from './DetailsForm';
import FileUpload from './FileUpload';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';
enum CreateState {
  new,
  editing,
  done,
  error,
}
enum UploadState {
  new,
  uploading,
  processing,
  done,
  error,
}

const MixCreate = () => {
  const [createState, setCreateState] = useState(CreateState.new);
  const [uploadState, setUploadState] = useState(UploadState.new);

  const [errors, setErrors] = useState<string[]>([]);
  const [fileName, setFilename] = useState('');
  const [percentageUploaded, setPercentageUploaded] = useState(0);
  const [mixId] = useState(uuidv4());
  const router = useRouter();

  React.useEffect(() => {
    if (uploadState === UploadState.done && createState === CreateState.done) {
      router.push('/');
    }
  }, [uploadState, createState]);

  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center w-full mx-auto space-y-4">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Let&apos;s create a mix
        </h1>
        {errors.length !== 0 && (
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
        {uploadState === UploadState.uploading && (
          <Progress
            percentage={percentageUploaded}
            title="Uploading audio"
          />
        )}
        {uploadState === UploadState.new && (
          <FileUpload
            mixId={mixId}
            onError={(e) => {
              setCreateState(CreateState.error);
              setErrors([...errors, e as string]);
            }}
            onUploadComplete={() => {
              setUploadState(UploadState.done);
            }}
            onUploadStart={(fileName) => {
              setFilename(fileName);
              setUploadState(UploadState.uploading);
            }}
            onUploadProgress={(total, loaded) =>
              setPercentageUploaded(Math.round((loaded * 100) / total))
            }
          />
        )}
        {createState === CreateState.new && uploadState !== UploadState.new && (
          <MixDetailsForm
            mixId={mixId}
            mixTitle={fileName}
            onMixCreated={(mix) => {
              setCreateState(mix ? CreateState.done : CreateState.error);
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
};
export default MixCreate;
