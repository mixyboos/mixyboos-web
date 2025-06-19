import type { LucideIcon } from 'lucide-react'
import type { SidebarItemProps } from '@/components/navigation/app-sidebar'
import { Icons } from '@/components/icons'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

const items: Array<SidebarItemProps> = [
  { title: 'New Shows', icon: Icons.recent as LucideIcon, link: '/new' },
  {
    title: 'Favourites',
    icon: Icons.heart as LucideIcon,
    link: '/me/favourites',
  },
  {
    title: 'Listen Later',
    icon: Icons.remind as LucideIcon,
    link: '/me/later',
  },
  {
    title: 'Genres',
    icon: Icons.genre as LucideIcon,
    link: '/dashboard/genres',
  },
  {
    title: 'Trending',
    icon: Icons.trending as LucideIcon,
    link: '/dashboard/trending',
  },
  {
    title: 'Live Now',
    icon: Icons.liveNow as LucideIcon,
    link: '/dashboard/live/now',
  },
]

export function NavFeed() {
  const { isMobile } = useSidebar()
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
            <Icons.verticalDots className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
