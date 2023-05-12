import React from "react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt:mt-0 mx-auto -mt-16 flex flex-col items-center justify-center px-6 dark:bg-gray-900 md:h-screen">
      <div className="flex items-center justify-center text-2xl font-semibold lg:mb-10">
        <Image
          src="/img/logo.svg"
          className="mr-4 h-10 w-auto"
          alt="Mixyboos Logo"
          width={64}
          height={64}
        />
        <span className="self-center whitespace-nowrap text-2xl font-bold text-gray-900 dark:text-white">
          MixyBoos Music Machine
        </span>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
