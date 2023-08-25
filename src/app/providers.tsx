"use client";
import React, { type PropsWithChildren } from "react";

import AudioProvider from "@/lib/providers/audio-provider";
import { SessionProvider } from "next-auth/react";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <AudioProvider>{children}</AudioProvider>
    </SessionProvider>
  );
};

export default Providers;
