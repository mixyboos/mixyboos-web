'use client';

import React, { PropsWithChildren } from 'react';
import { IUiState, useUiStore } from '@lib/services/ui';
import useAudioStore, {
  IAudioState,
  PlayState,
} from '@lib/services/audio/audioStore';
import { Sidebar, TopNavbar } from '@lib/components/layout/index';
import Footer from '@lib/components/layout/Footer';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import { Loading } from '@lib/components/widgets';

export interface IPageContainerProps extends PropsWithChildren<any> {}

const PageContainer = ({ children }: IPageContainerProps) => {
  const hasHeader = useUiStore((state: IUiState) => state.hasHeader);
  const setHasHeader = useUiStore((state: IUiState) => state.setHasHeader);
  const hasSidebar = useUiStore((state: IUiState) => state.hasSidebar);
  const setHasSidebar = useUiStore((state: IUiState) => state.setHasSidebar);

  const { data: session, status } = useSession();
  const playState = useAudioStore((state: IAudioState) => state.playState);

  React.useEffect(() => {
    // setHasSidebar(status === 'authenticated');
  }, [status, setHasSidebar]);
  return status === 'loading' ? (
    <Loading />
  ) : (
    <React.Fragment>
      <Head>
        <title>Mixy|Boos</title>
      </Head>
      {hasHeader && <TopNavbar />}
      <main className="px-4 mx-auto overflow-hidden bg-white max-w-8xl sm:px-6 md:px-8">
        {children}
      </main>
      {/* {playState !== PlayState.stopped && (
        <footer className="py-5 text-center text-white bg-podnoms">
          <Footer />
        </footer>
      )} */}
    </React.Fragment>
  );
};

export default PageContainer;
