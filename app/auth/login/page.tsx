'use client';
import React, { FormEvent, useState } from 'react';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const searchParams = useSearchParams();

  const [userName, setUserName] = useState(
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
      ? 'fergal.moran+mixyboos@gmail.com'
      : ''
  );
  const [password, setPassword] = useState(
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
      ? 'SVqVKJWZh5dIaM7JsNY1h0E/xbzPCD7y7Veedxa1Q/k='
      : ''
  );

  const handleLogin = async ($event: FormEvent<HTMLFormElement>) => {
    $event.preventDefault();
    try {
      await signIn('credentials', {
        userName,
        password,
        callbackUrl: searchParams.get('callbackUrl') as string,
        redirect: true,
      });
    } catch (err) {
      debugger;
      console.error('login', 'handleLogin', err);
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen">
      <div className="flex h-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div
          className="hidden h-full bg-cover lg:block lg:w-3/4"
          style={{ backgroundImage: 'url(/img/login-bg.jpg)' }}
        />
        <div className="w-full px-6 py-24 md:px-8 lg:w-1/4">
          <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
            Welcome back!
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-200">
            to mixyboos
          </p>
          <button
            onClick={() => signIn('google')}
            className="flex items-center justify-center w-full mt-4 text-gray-600 rounded-lg shadow-md dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-3">
              <svg
                className="w-6 h-6"
                viewBox="0 0 40 40"
              >
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </button>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
            <a
              href="pages/api#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login with email
            </a>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
          </div>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="username"
                name="username"
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Email address"
                type="email"
                autoComplete="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="pages/api#"
                  className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="password"
                value={password}
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            <a
              href="pages/api#"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </a>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
