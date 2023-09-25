"use client";
import Sidebar from "@/lib/components/layout/sidebar";
import Loading from "@/components/widgets/loading";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  if (!session) return <Loading />;

  return (
    <div className="xl:mx-20 -mb-16 flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
