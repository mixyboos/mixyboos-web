"use client";

import { Progress } from "@/components/ui/progress";
import FileUpload from "@/lib/components/widgets/FileUpload";
import PageHeader from "@/lib/components/widgets/PageHeader";
import { type MixModel } from "@/lib/models";
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
      <div className="flex flex-col items-center justify-center">
        {errors.length !== 0 && (
          <div className="flex w-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-slate-800">
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
          <div className="mx-auto w-3/5 my-8">
            <h3 className="mb-2 text-sm text-muted-foreground">Uploading..</h3>
            <Progress value={percentageUploaded} title="Uploading audio" />
          </div>
        )}
        {uploadState === UploadState.new && (
          <div className="mx-auto w-3/5 my-8">
            {" "}
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
          </div>
        )}
        {createState === CreateState.new && uploadState !== UploadState.new && (
          <MixCreateDetailsComponent
            mix={{ id: mixId, title: fileName } as MixModel}
            onMixCreated={(mix) => {
              setCreateState(mix ? CreateState.done : CreateState.error);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MixCreateComponent;
