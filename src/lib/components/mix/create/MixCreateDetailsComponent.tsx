"use client";
import { Formik } from "formik";

import React from "react";
import ImageUpload from "@/lib/components/widgets/ImageUpload";

const MixCreateDetailsComponent = () => {
  const [image, setImage] = React.useState<File | undefined>();
  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <h2 className="mb-2 text-xl font-bold dark:text-white">Mix info</h2>
        <Formik
          initialValues={{ title: "Fuck", description: "You" }}
          onSubmit={(values, { setSubmitting }) => {
            alert("Some bang off these yokes");
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={() => handleSubmit()}
              className="flex flex-col border border-gray-300 p-4 text-gray-800 shadow-lg"
            >
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Mix title
                </label>
                <input
                  autoFocus
                  className="block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-gray-900 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-50 dark:text-white sm:text-sm"
                  id="title"
                  name="title"
                  spellCheck="false"
                  placeholder="Mix Title"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Description
                  </label>
                  <textarea
                    className="block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-gray-900 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-50 dark:text-white sm:text-sm"
                    id="description"
                    name="description"
                    spellCheck="true"
                    rows={5}
                    placeholder="Tell us something about the mix"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                </div>
                <div className="icons m-2 flex text-gray-500">
                  <svg
                    className="mr-2 h-7 cursor-pointer rounded-full border p-1 hover:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg
                    className="mr-2 h-7 cursor-pointer rounded-full border p-1 hover:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <svg
                    className="mr-2 h-7 cursor-pointer rounded-full border p-1 hover:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <div className="count ml-auto text-xs font-semibold text-gray-400">
                    0/300
                  </div>
                </div>
                <div className="buttons flex">
                  <div className="ml-auto p-1 px-4 ">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      title="Create"
                    ></button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="w-1/2 content-center">
        <h2 className="mb-2 text-xl font-bold dark:text-white">Mix image</h2>
        <ImageUpload
          onImageChanged={(image) => {
            console.log("MixDetailsForm", "onImageChanged", image);
            setImage(image);
          }}
        />
      </div>
    </div>
  );
};
export default MixCreateDetailsComponent;
