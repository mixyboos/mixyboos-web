"use client";
import Link from "next/link";
import React from "react";

import { MdLogin } from "react-icons/md";
import Button from "@/lib/components/widgets/Button";
import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";
import { notice } from "@/lib/components/notifications/toast";
import { Formik } from "formik";
import * as Yup from "yup";
import { api } from "@/lib/utils/api";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const register = api.auth.signUp.useMutation({
    onSuccess: (result) => {
      console.log("page", "register_success", result);
    },
  });

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    username: Yup.string()
      .required("Username is a required field")
      .max(20, "Username cannot be more than 20 characters"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleRegister = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const result = await register.mutateAsync({ email, username, password });
      console.log("page", "handleRegister", result);
      if (result?.status === 201) {
        await signIn();
      }
    } catch (err) {
      console.error("RegisterPage", "handleLogin", err);
    }
  };
  return (
    <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create a new account
        </h2>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button
            title="Sign in with Facebook"
            onClick={() => {
              notice("Warning", "Facebook login is not working yet");
              // signIn('facebook')
            }}
            className="inline-flex w-full justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#4267B2] shadow-sm hover:bg-gray-50"
          >
            <BsFacebook className="h-5 w-5" />
          </button>
          <button
            title="Sign in with Google"
            onClick={() => {
              notice("Warning", "Google login is not working yet");
              // signIn('google', {
              //   callbackUrl: `${window.location.origin}/`
              // })
            }}
            className="inline-flex w-full justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#DB4437] shadow-sm hover:bg-gray-50"
          >
            <BsGoogle className="h-5 w-5" />
          </button>
          <button
            title="Sign in with Twitter"
            onClick={() => {
              notice("Warning", "Twitter login is not working yet");
              // signIn('twitter')
            }}
            className="inline-flex w-full justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#00acee] shadow-sm hover:bg-gray-50"
          >
            <BsTwitter className="h-5 w-5" />
          </button>
        </div>
        <Formik
          validationSchema={schema}
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={async (values) => {
            await handleRegister(
              values.email,
              values.username,
              values.password
            );
          }}
        >
          {({
            values,
            setValues,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-50 sm:text-sm"
                  placeholder="name@company.com"
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your user name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-50 sm:text-sm"
                  placeholder="Your name on the site"
                  onChange={handleChange}
                />
                {errors.username && touched.username && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> {errors.username}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirm password"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                id="login-button"
                buttonStyle="fancy"
                type="submit"
                title="Create new account"
                icon={<MdLogin />}
              ></Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
