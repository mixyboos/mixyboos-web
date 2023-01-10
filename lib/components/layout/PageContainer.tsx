'use client';

import React, { PropsWithChildren } from 'react';
import { IUiState, useUiStore } from '@lib/services/ui';
import useAudioStore, {
  IAudioState,
  PlayState,
} from '@lib/services/audio/audioStore';
import { TopNavbar } from '@lib/components/layout/index';
import Footer from '@lib/components/layout/Footer';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
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
      <div className="flex flex-col h-screen">
        <div>{hasHeader && <TopNavbar />}</div>
        <div className="flex-grow">
          <main className="max-w-6xl px-4 mx-auto overflow-hidden bg-white sm:px-6 md:px-8">
            {children}
          </main>
        </div>
        <div>
          {playState !== PlayState.stopped && (
            <footer className="text-center text-white">
              <Footer />
            </footer>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageContainer;
