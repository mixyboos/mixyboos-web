"use client";
import UserSidebar from "@/components/navigation/user-sidebar";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full p-4">{children}</div>;
};

export default DashboardLayout;
