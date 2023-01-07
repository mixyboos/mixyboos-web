'use client';

import { SessionProvider } from 'next-auth/react';
import { AudioProvider } from '@lib/services/audio';
import { Flowbite } from 'flowbite-react';
import { AnalyticsWrapper } from '@lib/components/analytics';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Flowbite>
        <AudioProvider>
          {children}
          <AnalyticsWrapper />
        </AudioProvider>
      </Flowbite>
    </SessionProvider>
  );
};
export default Providers;
