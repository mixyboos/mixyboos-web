"use client";

import FileUpload from "@/lib/components/widgets/FileUpload";
import PageHeader from "@/lib/components/widgets/PageHeader";
import Progress from "@/lib/components/widgets/Progress";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import MixCreateDetailsComponent from "./MixCreateDetailsComponent";

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
const MixCreateComponent = () => {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [createState, setCreateState] = React.useState(CreateState.new);
  const [uploadState, setUploadState] = React.useState(UploadState.new);
  const [percentageUploaded, setPercentageUploaded] = React.useState(0);
  const [mixId] = React.useState(uuidv4());
  const [fileName, setFilename] = React.useState("");
  return (
    <div className="flex flex-col justify-center space-y-4">
      <PageHeader title="Let's create a mix" />
      <div className="flex items-center justify-center">
        <div className="w-3/4 max-w-2xl">
          {errors.length !== 0 && (
            <div className="mx-auto flex w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md dark:bg-slate-800">
              <div className="flex w-12 items-center justify-center bg-red-500">
                <MdOutlineErrorOutline className="h-6 w-6 fill-current text-white" />
              </div>
              <div className="-mx-3 px-4 py-2">
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
            <Progress percentage={percentageUploaded} title="Uploading audio" />
          )}
          {uploadState === UploadState.new && (
            <FileUpload
              mixId={mixId}
              onError={(e) => {
                setCreateState(CreateState.error);
                setErrors([...errors, e]);
              }}
              onUploadComplete={() => {
                setUploadState(UploadState.done);
              }}
              onUploadStart={(fileName) => {
                setFilename(fileName);
                setUploadState(UploadState.uploading);
              }}
              onUploadProgress={(total, loaded) => {
                setPercentageUploaded(Math.round((loaded * 100) / total));
              }}
            />
          )}
          {createState === CreateState.new &&
            uploadState !== UploadState.new && (
              <MixCreateDetailsComponent
              // mix={{ id: mixId, title: fileName } as MixModel}
              // onMixCreated={(mix) => {
              //   setCreateState(mix ? CreateState.done : CreateState.error);
              // }}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default MixCreateComponent;
