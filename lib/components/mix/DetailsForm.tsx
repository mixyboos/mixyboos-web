import MixService from '@lib/services/api/mixService';
import { Formik } from 'formik';

import React from 'react';
import { Button } from '@lib/components/widgets';
import { MixModel } from '@lib/data/models';

interface IDetailsFormProps {
  mixId: string;
  mixTitle: string;
  onMixCreated: (mix: MixModel) => void;
}
const MixDetailsForm = ({
  mixId,
  mixTitle,
  onMixCreated,
}: IDetailsFormProps) => {

  const mixService = new MixService();
  return (
    <Formik
      initialValues={{ title: mixTitle, description: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          mixService
            .createMix({
              id: mixId,
              title: values.title,
              description: values.description,
              isProcessed: false,
            })
            .then((r) => {
              setSubmitting(false);
              onMixCreated(r);
            });
        }, 400);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-1/2 p-4 text-gray-800 border border-gray-300 shadow-lg"
        >
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Mix title
            </label>
            <input
              autoFocus
              className="bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5 dark:text-white"
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Description
              </label>
              <textarea
                className="bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5 dark:text-white"
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
            <div className="flex m-2 text-gray-500 icons">
              <svg
                className="p-1 mr-2 border rounded-full cursor-pointer hover:text-gray-700 h-7"
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
                className="p-1 mr-2 border rounded-full cursor-pointer hover:text-gray-700 h-7"
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
                className="p-1 mr-2 border rounded-full cursor-pointer hover:text-gray-700 h-7"
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
              <div className="ml-auto text-xs font-semibold text-gray-400 count">
                0/300
              </div>
            </div>
            <div className="flex buttons">
              <div className="p-1 px-4 ml-auto ">
                <Button
                  buttonStyle="delete"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  buttonStyle="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
export default MixDetailsForm;