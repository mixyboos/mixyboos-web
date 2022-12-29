'use client';

import { SessionProvider } from 'next-auth/react';
import { AudioProvider } from '@lib/services/audio';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AudioProvider>{children}</AudioProvider>
    </SessionProvider>
  );
};
export default Providers;
