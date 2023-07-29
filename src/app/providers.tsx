"use client";
import { ThemeProvider } from "@/components/theme-provider";
import AudioProvider from "@/lib/providers/audio-provider";
import { api } from "@/lib/utils/api";
import { SessionProvider } from "next-auth/react";
import React from "react";

type ProvidersProps = {
  children: React.ReactNode;
};
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
