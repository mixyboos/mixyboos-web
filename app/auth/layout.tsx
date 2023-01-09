import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col items-center  px-6 mx-auto mt-10 md:h-screen'>
      {children}
    </div>
  );
};

export default AuthLayout;
