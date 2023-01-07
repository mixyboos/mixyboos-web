'use client';

import { SessionProvider } from 'next-auth/react';
import { AudioProvider } from '@lib/services/audio';
import { Flowbite } from 'flowbite-react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Flowbite>
        <AudioProvider>{children}</AudioProvider>
      </Flowbite>
    </SessionProvider>
  );
};
export default Providers;
