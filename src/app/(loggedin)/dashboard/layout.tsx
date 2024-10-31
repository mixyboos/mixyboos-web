"use client";
import UserSidebar from "@/components/navigation/user-sidebar";
import React from "react";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import FooterComponent from "@/components/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useAuth();

  return (
    <div className="xl:mx-20 -mb-16 flex h-screen overflow-hidden">
      <SidebarProvider>
        <UserSidebar />

        <div className="w-full p-4">
          {/* <SidebarTrigger /> */}
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
