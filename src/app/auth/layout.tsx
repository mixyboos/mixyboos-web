import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex flex-col items-center  px-6  md:h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
