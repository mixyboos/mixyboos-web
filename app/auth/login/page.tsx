'use client';
import React, { FormEvent, useState } from 'react';
import { BsFacebook, BsGoogle, BsTwitter } from 'react-icons/bs';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const [errors, setErrors] = React.useState<string[]>([]);
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
      setErrors([]);
      await signIn('credentials', {
        userName,
        password,
        callbackUrl: searchParams.get('callbackUrl') || '/',
        redirect: true,
      });
    } catch (err) {
      console.error('login', 'handleLogin', err);
      setErrors([...errors, err as string]);
    }
  };

  return (
    <>
      <Link
        href="/"
        className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10"
      >
        <img
          src="/img/logo.svg"
          className="h-10 mr-4"
          alt="Mixyboos Logo"
        />
        <span className="self-center text-2xl font-bold whitespace-nowrap">
          MixyBoos Music Machine
        </span>
      </Link>
      <div className="w-full max-w-lg p-10 bg-white shadow-xl rounded-2xl shadow-gray-300">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Sign in to platform
          </h2>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <button
              title="Sign in with Facebook"
              onClick={() => signIn('facebook')}
              className="inline-flex justify-center w-full px-5 py-2.5 text-sm font-medium text-[#4267B2] border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <BsFacebook className="w-5 h-5" />
            </button>
            <button
              title="Sign in with Google"
              onClick={() => signIn('google')}
              className="inline-flex justify-center w-full px-5 py-2.5 text-sm font-medium text-[#DB4437] border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <BsGoogle className="w-5 h-5" />
            </button>
            <button
              title="Sign in with Twitter"
              onClick={() => signIn('twitter')}
              className="inline-flex justify-center w-full px-5 py-2.5 text-sm font-medium text-[#00acee] border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <BsTwitter className="w-5 h-5" />
            </button>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => handleLogin(e)}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                id="username"
                name="username"
                type="email"
                className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                placeholder="name@company.com"
                autoComplete="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  name="remember"
                  type="checkbox"
                  className="w-5 h-5 border-gray-300 rounded focus:outline-none focus:ring-0 checked:bg-dark-900"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900"
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
            {errors && errors.length > 0 && (
              <div
                className="p-4 mb-4 text-sm text-white rounded-lg bg-gradient-to-br from-red-200 to-red-500"
                role="alert"
              >
                <span className="font-medium">Unable to log you in !</span>
                {errors.map((e) => e)}
              </div>
            )}
            <button
              type="submit"
              className="py-3 px-5 w-full text-base font-medium text-center text-white bg-gradient-to-br from-pink-500 to-voilet-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto"
            >
              Login to your account
            </button>
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
        </div>
      </div>
    </>
  );
};

export default LoginPage;
