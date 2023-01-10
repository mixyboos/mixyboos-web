import Providers from './providers';
import { PageContainer } from '@lib/components/layout';
import './app.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="antialiased bg-white text-slate-500 dark:text-slate-400 dark:bg-slate-900 font-space">
        <Providers>
          <PageContainer>{children}</PageContainer>
        </Providers>
      </body>
    </html>
  );
}
