"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
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
export type SidebarItemProps = {
  title: string;
  icon?: LucideIcon;
  link: string;
};
const items = {
  feed: [
    { title: "New Shows", icon: Icons.recent as LucideIcon, link: "/new" },
    {
      title: "Favourites",
      icon: Icons.heart as LucideIcon,
      link: "/me/favourites",
    },
    {
      title: "Listen Later",
      icon: Icons.remind as LucideIcon,
      link: "/me/later",
    },
    {
      title: "Genres",
      icon: Icons.genre as LucideIcon,
      link: "/dashboard/genres",
    },
    {
      title: "Trending",
      icon: Icons.trending as LucideIcon,
      link: "/dashboard/trending",
    },
    {
      title: "Live Now",
      icon: Icons.liveNow as LucideIcon,
      link: "/dashboard/live/now",
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Icons.mixyboos className="!size-5" />
                <span className="text-base font-semibold">{siteConfig.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMe />
        <NavFeed />
        {/* <NavAdmin />  */}
      </SidebarContent>
      <SidebarFooter>
        <span>Nav User</span>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
