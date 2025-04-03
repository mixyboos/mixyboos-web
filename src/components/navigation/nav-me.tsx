import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";
import { SidebarItemProps } from "@/components/navigation/app-sidebar";
import { Icons } from "@/components/icons";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

const items: SidebarItemProps[] = [
  {
    title: "My Shows",
    icon: Icons.liveStream as LucideIcon,
    link: "/dashboard/shows",
  },
  {
    title: "My Mixes",
    icon: Icons.mix as LucideIcon,
    link: "/dashboard/mixes",
  },
  {
    title: "My Profile",
    icon: Icons.user as LucideIcon,
    link: "/dashboard/profile",
  },
  {
    title: "Stats",
    icon: Icons.graph as LucideIcon,
    link: "/dashboard/stats",
  },
];

export function NavMe() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Upload Mix"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Upload Mix</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <Icons.upload />
              <span className="sr-only">Upload</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.link}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
