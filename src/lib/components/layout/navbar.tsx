"use client";

import { Icons, type Icon } from "@/components/icons";
import Search from "@/components/widgets/search";
import { ThemeToggle } from "@/components/widgets/theme-toggle";
import UserNav from "@/components/widgets/user-nav";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
  href: string;
  title: string;
  Icon: Icon;
};

const NavLink = ({ href, title, Icon }: NavLinkProps) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium lowercase text-foreground transition-opacity hover:opacity-60",
        path !== href && "text-foreground",
      )}
    >
      <div className="inline-flex items-center">
        <Icon className="mr-0.5 h-4 w-4" />
        <span>{title}</span>
      </div>
    </Link>
  );
};
const Navbar = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex h-16 items-center px-4">
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link className="mr-6 flex items-center space-x-2" href="/">
          <Icons.mixyboos className="mr-2 h-44 w-80" />
          <span className="hidden font-bold lowercase sm:inline-block">
            Mixy/Boos
          </span>
        </Link>
        <NavLink href="/discover" title="Discover" Icon={Icons.discover} />
        <NavLink href="/live/create" title="Go live" Icon={Icons.broadcast} />
        <NavLink href="/mix/create" title="Upload" Icon={Icons.mix} />
        <NavLink href="/calendar" title="Upcoming" Icon={Icons.schedule} />
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <ThemeToggle />
        {status !== "loading" &&
          (session ? (
            <UserNav session={session} />
          ) : (
            <NavLink href="/auth/login" title="Login" Icon={Icons.login} />
          ))}
      </div>
    </div>
  );
};

export default Navbar;
