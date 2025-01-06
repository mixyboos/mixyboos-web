"use client"

import { AuthProvider } from "@/lib/contexts/auth/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import AudioProvider from "@/lib/contexts/audio-provider";
import { CookiesProvider } from "react-cookie";
import QueryProvider from "@/app/query-client.provider";
type AppProvidersProps = {
  children: React.ReactNode;
};
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <CookiesProvider>
      <QueryProvider>
        <AuthProvider>
          <AudioProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AudioProvider>
        </AuthProvider>
      </QueryProvider>
    </CookiesProvider>
  );
};

export default AppProviders;
