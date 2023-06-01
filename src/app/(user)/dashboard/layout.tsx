"use client";
import Sidebar from "@/lib/components/layout/sidebar/Sidebar";
import Loading from "@/lib/components/widgets/Loading";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (!session) return <Loading />;
  return (
    <div className="mx-20 -mb-16 flex h-screen overflow-hidden">
      <Sidebar session={session} />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
