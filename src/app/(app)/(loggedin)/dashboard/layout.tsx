"use client";
import UserSidebar from "@/components/navigation/user-sidebar";
import React from "react";
import {SidebarProvider} from "@/components/ui/sidebar";

const DashboardLayout = ({children}: { children: React.ReactNode }) => {

  return (
    <div className="xl:mx-20 -mb-16 flex h-screen overflow-hidden">
      <SidebarProvider>
        <UserSidebar/>

        <div className="w-full p-4">
          {/* <SidebarTrigger /> */}
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
