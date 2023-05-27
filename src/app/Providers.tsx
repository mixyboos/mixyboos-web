"use client";
import { api } from "@/lib/utils/api";
import { SessionProvider } from "next-auth/react";
import React from "react";

type ProvidersProps = {
  children: React.ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default api.withTRPC(Providers);
