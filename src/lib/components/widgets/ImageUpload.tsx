/* eslint-disable @next/next/no-img-element */
import React from "react";
import Dropzone, { useDropzone, type DropzoneRef } from "react-dropzone";

type ImageUploadProps = {
  onImageChanged: (newImage: File | undefined) => void;
};
const ImageUpload = ({ onImageChanged }: ImageUploadProps) => {
  const dropzoneRef = React.createRef<DropzoneRef>();

  return (
    <Dropzone
      accept={{
        "image/png": [".png"],
        "image/jpg": [".jpg", ".jpeg"],
      }}
      maxFiles={1}
      ref={dropzoneRef}
      onDrop={(acceptedFiles) => {
        onImageChanged(
          acceptedFiles.length !== 0 ? acceptedFiles[0] : undefined
        );
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => {
        return (
          <div className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              {acceptedFiles?.length ? (
                <div id="preview">
                  {acceptedFiles[0] && (
                    <img
                      className="object-cover"
                      src={URL.createObjectURL(acceptedFiles[0])}
                      alt="image preview"
                    />
                  )}
                </div>
              ) : (
                <div id="drop">
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="dropzone-file"
                      className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-slate-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          aria-hidden="true"
                          className="mb-3 h-10 w-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        {...getInputProps()}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
};
export default ImageUpload;
