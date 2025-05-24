import * as React from "react";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const UserNav: React.FC = () => {
  const { isMobile } = useSidebar();
  const { profile } = useAuth();
  if (!profile) return null;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={profile.profileImage}
                  alt={profile.displayName || "Profile Name"}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{profile.title}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {profile.displayName}
                </span>
              </div>
              <Icons.verticalDots className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={profile.profileImage} alt={profile.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{profile.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {profile.username}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icons.userSettings />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.creditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.activity />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icons.logout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="ghost" className="h-8 w-8 rounded-full">
    //       <UserImage
    //         src={profile?.profileImage as string}
    //         status={"offline"}
    //         size={"sm"}
    //       />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-56" align="end" forceMount>
    //     <DropdownMenuLabel className="font-normal">
    //       <div className="flex flex-col space-y-1">
    //         <p className="text-sm font-medium leading-none">{profile.name}</p>
    //         <p className="text-xs leading-none ">{profile.email}</p>
    //       </div>
    //     </DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuGroup>
    //       <DropdownMenuItem>
    //         <Link href={"/settings/profile"} className="flex w-full flex-row">
    //           <Icons.user className="mr-2 h-4 w-4" />
    //           <span className="grow">Profile</span>
    //           <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    //         </Link>
    //       </DropdownMenuItem>
    //       <DropdownMenuItem>
    //         <Link href={"/settings/billing"} className="flex w-full flex-row">
    //           <Icons.creditCard className="mr-2 h-4 w-4" />
    //           <span className="grow">Billing</span>
    //           <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
    //         </Link>
    //       </DropdownMenuItem>
    //       <DropdownMenuItem>
    //         <Link href={"/settings"} className="flex w-full flex-row">
    //           <Icons.settings className="mr-2 h-4 w-4" />
    //           <span className="grow">Settings</span>
    //           <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    //         </Link>
    //       </DropdownMenuItem>
    //     </DropdownMenuGroup>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem
    //       onClick={async () => await AuthService.logout("/")}
    //       className="cursor-pointer"
    //     >
    //       <Icons.logout className="mr-2 h-4 w-4" />
    //       <span>Log out</span>
    //       <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};
export default UserNav;
