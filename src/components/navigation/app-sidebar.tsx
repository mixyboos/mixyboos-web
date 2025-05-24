"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMe } from "@/components/navigation/nav-me";
import { Icons } from "@/components/icons";
import { LucideIcon } from "lucide-react";
import { NavFeed } from "@/components/navigation/nav-feed";
import { siteConfig } from "@/config/site";
import useAudioStore, { PlayState } from "@/lib/contexts/audio-context";
import { cn } from "@/lib/utils";
import UserNav from "./user-nav";

export type SidebarItemProps = {
  title: string;
  icon?: LucideIcon;
  link: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get audio playback state to detect if MiniPlayer is visible
  const { playState } = useAudioStore();
  const isMiniPlayerVisible = playState !== PlayState.stopped;

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className={cn(
        props.className,
        isMiniPlayerVisible ? "app-sidebar-with-player" : "app-sidebar-without-player"
      )}
      style={{
        // Adjust height when mini player is visible
        ...(props.style || {}),
        height: isMiniPlayerVisible ? "calc(100vh - 64px)" : "100vh",
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Icons.mixyboos className="!size-5 text-foreground fill-current" />
                <span className="text-base font-semibold">{siteConfig.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMe />
        <NavFeed />
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
