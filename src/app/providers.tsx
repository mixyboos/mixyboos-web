"use client";
import React, { type PropsWithChildren } from "react";

import ThemeProvider from "@/components/theme-provider";
import AudioProvider from "@/lib/providers/audio-provider";
import { SessionProvider } from "next-auth/react";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ClientProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AudioProvider>{children}</AudioProvider>
        </ThemeProvider>
      </SessionProvider>
    </ClientProvider>
  );
};

export default Providers;
