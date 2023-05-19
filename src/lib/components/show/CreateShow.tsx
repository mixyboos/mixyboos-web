import React from "react";
import Input from "../widgets/Input";
import TaggedInput from "../widgets/TaggedInput";
import CopyInput from "../widgets/CopyInput";
import Button from "../widgets/Button";
import { api } from "@/lib/utils/api";
import { z } from "zod";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Textarea from "../widgets/Textarea";

type CreateShowProps = {
  startShow: (
    title: string,
    description: string,
    tags: string[]
  ) => Promise<void>;
};

const CreateShow = ({ startShow }: CreateShowProps) => {
  const { data: streamKey } = api.auth.getStreamKey.useQuery();
  const { data: streamHost } = api.settings.getStreamHost.useQuery();

  const schema = z.object({
    title: z
      .string({
        required_error: "Can't have a show without a title??",
      })
      .min(5, "C'mon make an effort - 5 characters minimum.")
      .max(30, "Woah!! Slow down, Shakespeare. 50 character limit."),
    description: z
      .string({
        required_error: "Can't have a show without a description??",
      })
      .min(10, "C'mon make an effort - 5 characters minimum.")
      .max(500, "Woah!! Slow down, Shakespeare. 500 character limit."),
  });

  if (!streamKey || !streamHost) return null;

  return (
    <div className="mx-auto mt-12  max-w-xl rounded-lg bg-white text-gray-900 shadow dark:bg-slate-800 dark:text-white sm:p-8">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-red-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span className="px-2 text-2xl font-semibold ">
          Let&apos;s do a Live Stream!
        </span>
      </div>
      <div className="mx-4 mt-4">
        <div className="mb-3 pt-0"></div>
      </div>
      <Formik
        validationSchema={toFormikValidationSchema(schema)}
        initialValues={{ title: "", description: "", tags: [] }}
        onSubmit={(values) => {
          console.log("CreateShow", "submitting", values);
          startShow(values.title, values.description, values.tags);
          // const result = await handleLogin(values.email, values.password);
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <div className="mx-4 mt-4">
              <Input
                id="title"
                label="Stream title"
                type="text"
                onChange={handleChange}
                placeholder="Title for your stream"
              />
              {touched && errors.title && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Error!</span> {errors.title}
                </p>
              )}
            </div>
            <div className="mx-4 mt-4">
              <Textarea
                id="description"
                label="Stream description"
                onChange={handleChange}
                placeholder="Description of your stream (optional)"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Error!</span>{" "}
                  {errors.description}
                </p>
              )}
            </div>
            <div className="mx-4 mt-4">
              <TaggedInput
                id="stream-tags"
                label="Tags"
                value={values.tags}
                placeholder="Add some tags for your show"
              />
            </div>
            <div className="mx-4 mt-4">
              <CopyInput
                id="stream-key"
                label="Stream key"
                type="text"
                readOnly={true}
                value={streamKey}
                obfuscate={true}
                placeholder="Stream key"
              />
            </div>
            <div className="mx-4 mt-4">
              <CopyInput
                id="server-url"
                label="Server url"
                type="text"
                readOnly={true}
                value={streamHost}
                placeholder="Stream key"
              />
            </div>
            <div className="buttons flex">
              <span className="ml-auto inline-flex rounded-md shadow-sm">
                <Button
                  title={"Let's Go!"}
                  buttonSize="md"
                  buttonStyle="primary"
                  type="submit"
                  icon={
                    <svg
                      className="mr-2 h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  }
                ></Button>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateShow;
