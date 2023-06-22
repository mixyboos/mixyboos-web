import React, { useEffect } from "react";
import Dropzone, { type DropzoneRef } from "react-dropzone";

type ImageUploadProps = {
  imageUrl: string | undefined;
  onImageChanged: (image: File) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  imageUrl,
  onImageChanged,
}) => {
  const dropzoneRef = React.createRef<DropzoneRef>();
  useEffect(() => {
    if (imageUrl) {
      console.log("image-upload", "imageUrl", imageUrl);
    }
  }, [imageUrl]);
  return (
    <Dropzone
      accept={{
        "image/png": [".png"],
        "image/jpg": [".jpg", ".jpeg"],
      }}
      maxFiles={1}
      ref={dropzoneRef}
      onDrop={(acceptedFiles) => {
        if (acceptedFiles.length !== 0 && acceptedFiles[0]) {
          onImageChanged(acceptedFiles[0]);
        }
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => {
        return (
          <div className="w-64 h-64">
            <div
              {...getRootProps({ className: "dropzone" })}
              onClick={(e) => e.stopPropagation()}
            >
              {acceptedFiles?.length || imageUrl ? (
                <div
                  id="preview"
                  className="flex w-full items-center justify-center"
                >
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="object-cover h-64 w-64 rounded-md border-muted border-2"
                      src={
                        acceptedFiles[0]
                          ? URL.createObjectURL(acceptedFiles[0])
                          : imageUrl
                      }
                      alt="image preview"
                    />
                  }
                </div>
              ) : (
                <div id="drop">
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
              )}
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
};

export default ImageUpload;
