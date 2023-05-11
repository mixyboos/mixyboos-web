import Link from "next/link";
import React from "react";
import { MdLogin } from "react-icons/md";

const LoginButton = () => {
  return (
    <Link
      href="/auth/login"
      className="mr-3 inline-flex items-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
    >
      <MdLogin className="-ml-1 mr-2 h-5 w-5" />
      Login/Register
    </Link>
  );
};

export default LoginButton;
