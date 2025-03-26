import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  IconCirclePlusFilled,
  IconDots,
  IconFolder,
  IconMail,
  IconShare3,
  IconTrash,
} from "@tabler/icons-react";
import { SidebarItemProps } from "@/components/navigation/app-sidebar";
import { Icons } from "@/components/icons";
import { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const items: SidebarItemProps[] = [
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
];

export function NavFeed() {
  const { isMobile } = useSidebar();
  return (
    <SidebarGroup className="group-data-[c`ollapsible=icon]:hidden">
      <SidebarGroupLabel>Feed</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.link}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <IconDots className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
