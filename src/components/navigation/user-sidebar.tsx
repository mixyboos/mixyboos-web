import { Icons } from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import UserImage from "@/components/widgets/user-image";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

const items = {
  me: [
    {
      name: "My Shows",
      icon: Icons.liveStream as LucideIcon,
      link: "/dashboard/shows",
    },
    {
      name: "My Mixes",
      icon: Icons.mix as LucideIcon,
      link: "/dashboard/mixes",
    },
    {
      name: "My Profile",
      icon: Icons.user as LucideIcon,
      link: "/dashboard/profile",
    },
    {
      name: "Stats",
      icon: Icons.graph as LucideIcon,
      link: "/dashboard/stats",
    },
  ],
  feed: [

  ],
};
//TODO: https://x.com/KaraBharat/status/1901883428494274901
const UserSidebar = () => {
  const { profile } = useAuth();
  return (
    <Sidebar variant="inset" collapsible="icon" className="mt-16 pb-16">
      <SidebarHeader>
        <div className="flex items-center space-x-4 p-2">
          {profile?.profileImage && (
            <UserImage
              src={profile?.profileImage as string}
              status={"offline"}
              size={"md"}
            />
          )}
          <div>
            <h2 className="text-sm font-semibold">
              {profile?.displayName || "Argle Bargle"}
            </h2>
            <span className="flex items-center space-x-1">
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline "
              >
                {profile?.biography || "Hello, Lover"}
              </a>
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup title="My stuff">
          <SidebarGroupLabel>My stuff</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.me.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={item.name === location.pathname}>
                    <Link href={item.link}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup title="Feed">
          <SidebarGroupLabel>My feed</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.feed.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={item.name === location.pathname}>
                    <Link href={item.link}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default UserSidebar;
