import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { PageContainer } from '@lib/components/layout';
import { AudioProvider } from '@lib/services/audio';
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AudioProvider>
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
      </AudioProvider>
    </SessionProvider>
  );
}
