"use client";
import { api } from "@/lib/utils/api";
import { Flowbite } from "flowbite-react";
import { SessionProvider } from "next-auth/react";
import React from "react";

type ProvidersProps = {
  children: React.ReactNode;
};
const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <Flowbite theme={{}}>{children}</Flowbite>
    </SessionProvider>
  );
};

export default api.withTRPC(Providers);
