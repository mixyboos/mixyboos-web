"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils/styles";
import Search from "@/components/widgets/search";
import { UserNav } from "@/components/widgets/user-nav";
import { ModeToggle } from "@/components/widgets/mode-toggle";
import { type Icon, Icons } from "@/components/icons";
import { LucideIcon } from "lucide-react";

// const NavbarLogin = ({
//   session,
//   status,
// }: {
//   session: Session | null;
//   status: "authenticated" | "loading" | "unauthenticated";
// }) => {
//   if (status === "loading") return <Loading />;

//   return session ? (
//     <ProfileDropdown session={session} />
//   ) : (
//     <NavLink
//       title="Login"
//       href="/auth/login"
//       icon={
//         <AiOutlineLogin className="text-cerise-800 leading-lg text-lg opacity-75 dark:text-slate-300" />
//       }
//     />
//   );
// };
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
        "text-sm font-medium lowercase transition-colors hover:text-primary",
        path !== href && "text-muted-foreground"
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
        <a className="mr-6 flex items-center space-x-2" href="/">
          <Image
            className="mr-2 h-6 w-6"
            src="/img/logo.svg"
            alt="Mixyboos"
            width={24}
            height={24}
          />

          <span className="hidden font-bold lowercase sm:inline-block">
            Mixy/Boos
          </span>
        </a>
        <NavLink href="/discover" title="Discover" Icon={Icons.discover} />
        <NavLink href="/live/create" title="Go live" Icon={Icons.live} />
        <NavLink href="/mix/create" title="Upload" Icon={Icons.mix} />
        <NavLink href="/calendar" title="Upcoming" Icon={Icons.schedule} />
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <ModeToggle />
        <UserNav />
      </div>
    </div>

    // <nav className="fixed z-30 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-800">
    //   <div className="px-3 py-3 lg:px-5 lg:pl-3">
    //     <div className="flex items-center justify-between">
    //       <div className="flex items-center justify-start">
    //         <button
    //           title="Sidebar toggler"
    //           id="toggleSidebarMobile"
    //           aria-expanded="true"
    //           className="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
    //         >
    //           <GiHamburgerMenu className="h-6 w-6" fill="currentColor" />
    //           <AiOutlineClose
    //             id="toggleSidebarMobileClose"
    //             className="hidden h-6 w-6"
    //             fill="currentColor"
    //           />
    //         </button>
    //         <Link
    //           href="/"
    //           className="ml-2 flex justify-center align-middle md:mr-24"
    //         >
    //           <Image
    //             className="mr-2 h-8 w-auto"
    //             src="/img/logo.svg"
    //             alt="Mixyboos"
    //             width={32}
    //             height={32}
    //           />
    //           <span className=" whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
    //             MixyBoos
    //           </span>
    //         </Link>
    //       </div>
    //       <div className="mr-4 flex flex-row space-x-2">
    //         <NavLink
    //           title="Discover"
    //           href="/discover"
    //           icon={
    //             <RiFindReplaceLine className="text-cerise-800 leading-lg text-lg opacity-75 dark:text-slate-300" />
    //           }
    //         />
    //         <NavLink
    //           title="Go Live"
    //           href="/live/create"
    //           icon={
    //             <GoBroadcast className="text-cerise-800 leading-lg text-lg opacity-75 dark:text-slate-300" />
    //           }
    //         />
    //         <NavLink
    //           title="Upload"
    //           href="/mix/create"
    //           icon={
    //             <MdOutlineCloudUpload className="text-cerise-800 leading-lg text-lg opacity-75 dark:text-slate-300" />
    //           }
    //         />
    //       </div>
    //       <div className="flex items-center">
    //         <div className="-mb-1 mr-3 hidden sm:block">
    //           <span />
    //         </div>

    //         <button
    //           id="toggleSidebarMobileSearch"
    //           type="button"
    //           className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:hidden"
    //         >
    //           <span className="sr-only">Search</span>
    //           <BsSearch
    //             className="h-6 w-6 text-gray-500 dark:text-gray-400"
    //             fill="currentColor"
    //           />
    //         </button>

    //         {/* {session && <NotificationsDropdownComponent session={session} />}
    //         {false && <AppsDropdownComponent />}
    //         <ThemeToggler />
    //         {session && <ProfileDropdown session={session} />} */}
    //         <NavbarLogin session={session} status={status} />
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
