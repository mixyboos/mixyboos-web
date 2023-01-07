import Providers from './providers';
import { PageContainer } from '@lib/components/layout';
import Script from 'next/script';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-gray-50">
        <Providers>
          <PageContainer>
            {children}
          </PageContainer>
        </Providers>
      </body>
    </html>
  );
}
