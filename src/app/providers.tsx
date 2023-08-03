"use client";
import React, { type PropsWithChildren } from "react";

import ThemeProvider from "@/components/theme-provider";
import AudioProvider from "@/lib/providers/audio-provider";
import { SessionProvider } from "next-auth/react";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AudioProvider>{children}</AudioProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
