"use client";
import React, { type PropsWithChildren } from "react";

import AudioProvider from "@/lib/providers/audio-provider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/lib/providers/theme-provider";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <AudioProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </AudioProvider>
    </SessionProvider>
  );
};

export default Providers;
