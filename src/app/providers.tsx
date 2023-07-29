"use client";
import React, { type PropsWithChildren } from "react";

import ThemeProvider from "@/components/theme-provider";
import AudioProvider from "@/lib/providers/audio-provider";
import { api } from "@/lib/utils/api";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps extends PropsWithChildren {}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AudioProvider>{children}</AudioProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(Providers);
