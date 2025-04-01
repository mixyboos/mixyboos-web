"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSelector } from "@/components/theme/theme-toggle";
import React from "react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Icons } from "@/components/icons";
import Link from "next/link";
export function AppTopbar() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <h1 className="text-base font-medium">
          <Button variant="outline" size="sm" className="mr-2" asChild>
            <Link href="/live/create">
              <Icons.liveStream className="mr-1.5 h-4 w-4" />
              Go Live
            </Link>
          </Button>
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <a
              href="https://github.com/mixyboos/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icons.github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <ThemeSelector />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

// type NavLinkProps = {
//   href: string;
//   title: string;
//   Icon: Icon;
// };

// const NavLink = ({ href, title, Icon }: NavLinkProps) => {
//   const path = usePathname();
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "text-sm font-medium lowercase text-foreground transition-opacity hover:opacity-60",
//         path !== href && "text-foreground"
//       )}
//     >
//       <div className="inline-flex items-center">
//         <Icon className="mr-0.5 h-4 w-4" />
//         <span>{title}</span>
//       </div>
//     </Link>
//   );
// };
// const Navbar = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
//   const { profile } = useAuth();
//   return (
//     <div className="flex h-16 items-center px-4 py-2">
//       <nav
//         className={cn("flex items-center space-x-4 lg:space-x-6", className)}
//         {...props}
//       >
//         <Link className="mr-6 flex items-center space-x-2" id="main-logo" href="/">
//           <Icons.mixyboos className="mr-2 h-44 w-80" />
//           <span className="hidden font-bold lowercase sm:inline-block">
//             mixy://boos
//           </span>
//         </Link>
//         <NavLink href="/discover" title="Discover" Icon={Icons.discover} />
//         <NavLink href="/live/create" title="Go live" Icon={Icons.broadcast} />
//         <NavLink href="/upload" title="Upload" Icon={Icons.mix} />
//         <NavLink href="/calendar" title="Upcoming" Icon={Icons.schedule} />
//       </nav>
//       <div className="ml-auto flex items-center space-x-4">
//         <Search />
//         <ThemeToggle />
//         {profile ? (
//           <UserNav />
//         ) : (
//           <NavLink href="/login" title="Login" Icon={Icons.login} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
