'use client';

import React from 'react';
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

export interface IPageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IPageContainerProps> = ({ children }) => {
  const hasHeader = useUiStore((state: IUiState) => state.hasHeader);
  const setHasHeader = useUiStore((state: IUiState) => state.setHasHeader);
  const hasSidebar = useUiStore((state: IUiState) => state.hasSidebar);
  const setHasSidebar = useUiStore((state: IUiState) => state.setHasSidebar);

  const { data: session, status } = useSession();
  const playState = useAudioStore((state: IAudioState) => state.playState);

  React.useEffect(() => {
    console.log('PageContainer', 'status', status, session);
    setHasSidebar(status === 'authenticated');
  }, [status]);
  return (
    <React.Fragment>
      <Head>
        <title>Mixy|Boos</title>
      </Head>

      {hasHeader && <TopNavbar />}
      <div className="flex pt-16 overflow-hidden bg-white">
        {hasSidebar && <Sidebar />}
        <div
          id="main-content"
          className={`relative w-full h-full overflow-y-auto bg-gray-50 ${
            hasSidebar && 'lg:ml-64'
          }`}
        >
          <main className="bg-gray-50">{children}</main>
        </div>
      </div>
      {playState !== PlayState.stopped && (
        <footer className="py-5 text-center text-white bg-podnoms">
          <Footer />
        </footer>
      )}
    </React.Fragment>
  );
};

export default PageContainer;
