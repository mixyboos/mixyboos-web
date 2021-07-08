import { Provider as AuthProvider } from 'next-auth/client';
import React from 'react';
import { PageContainer } from '../src/components';
import { AudioProvider } from '../src/services/audio';
import './index.css';

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <AudioProvider>
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
      </AudioProvider>
    </AuthProvider>
  );
};

export default App;
