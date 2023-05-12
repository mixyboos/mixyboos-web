"use client";
import React from "react";
import {
  BsArrowReturnLeft,
  BsFacebook,
  BsGoogle,
  BsTwitter,
} from "react-icons/bs";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MdLogin } from "react-icons/md";
import * as Yup from "yup";
import { Formik } from "formik";
import { notice } from "@/lib/components/notifications/toast";
import Button from "@/lib/components/widgets/Button";

//https://github.com/jaredpalmer/formik/issues/3165

const AutofillSync = ({
  values,
  setValues,
}: {
  values: { email: any; password: any };
  setValues: any;
}) => {
  React.useEffect(() => {
    if (
      (document.querySelector('input[name="email"]') as HTMLInputElement)
        ?.value ||
      (document.querySelector('input[name="password"]') as HTMLInputElement)
        ?.value
    ) {
      if (!values.email || !values.password) {
        setValues({
          email:
            (document.querySelector('input[name="email"]') as HTMLInputElement)
              ?.value || "",
          password:
            (
              document.querySelector(
                'input[name="password"]'
              ) as HTMLInputElement
            )?.value || "",
        });
      }
    }
  }, []);
  return null;
};

const LoginPage = () => {
  const [loginError, setLoginError] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoginError(false);
      const result = await signIn("credentials", {
        email: email,
        password,
        callbackUrl:
          searchParams?.get("callbackUrl") ||
          searchParams?.get("returnUrl") ||
          "/",
        redirect: false,
      });
      if (result?.ok) {
        router.push(searchParams?.get("returnUrl") || "/");
        return;
      }
    } catch (err) {
      console.error("login", "handleLogin", err);
    }
    setLoginError(true);
  };
  return (
    <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
      <div className="space-y-8">
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
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            const result = await handleLogin(values.email, values.password);
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
              <AutofillSync values={values} setValues={setValues} />
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
                    <span className="font-medium">Oops!&nbsp;</span>{" "}
                    {errors.email}
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
                    <span className="font-medium">Oops!&nbsp;</span>
                    {errors.password}
                  </p>
                )}
              </div>
              {loginError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!&nbsp;</span>
                  Unable to log you in.
                </p>
              )}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    name="remember"
                    type="checkbox"
                    className="checked:bg-dark-900 h-5 w-5 rounded border-gray-300 focus:outline-none focus:ring-0 "
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-900 dark:text-white"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/auth/forgot"
                  className="ml-auto text-sm text-fuchsia-600 hover:underline"
                >
                  Lost Password?
                </Link>
              </div>

              <Button
                id="login-button"
                buttonStyle="fancy"
                type="submit"
                title="Login to your account"
                icon={<MdLogin />}
              ></Button>
              <div className="text-sm font-medium text-gray-500">
                Not registered?
                <Link
                  href="/auth/register"
                  className="ml-2 text-fuchsia-600 hover:underline"
                >
                  Create account
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
