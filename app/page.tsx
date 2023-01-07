'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { MixListPage, PricingPage } from '@lib/components/pages';

const IndexPage = () => {
  const { data: session, status } = useSession();
  const _getPage = () => {
    switch (status) {
      case 'authenticated':
        return <MixListPage />;
      case 'loading':
        return <></>;
      case 'unauthenticated':
        return <PricingPage />;
    }
  };
  return _getPage();
};

export default IndexPage;
