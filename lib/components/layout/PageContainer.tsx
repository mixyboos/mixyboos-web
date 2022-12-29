'use client';

import React from 'react';
import { IUiState, useUiStore } from '@lib/services/ui';
import useAudioStore, {
  IAudioState,
  PlayState,
} from '@lib/services/audio/audioStore';
import { TopNavbar } from '@lib/components/layout/index';
import Footer from '@lib/components/layout/Footer';
import Head from 'next/head';

export interface IPageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IPageContainerProps> = ({ children }) => {
  const showHeader = useUiStore((state: IUiState) => state.hasHeader);
  const playState = useAudioStore((state: IAudioState) => state.playState);
  return (
    <React.Fragment>
      <div className="flex flex-col h-screen">
        <Head>
          <title>Mixy|Boos</title>
        </Head>
        {showHeader && <TopNavbar />}
        <main className="flex-1 m-4">
          <React.Fragment>{children}</React.Fragment>
        </main>
        {playState !== PlayState.stopped && (
          <footer className="py-5 text-center text-white bg-podnoms">
            <Footer />
          </footer>
        )}
      </div>
    </React.Fragment>
  );
};

export default PageContainer;
