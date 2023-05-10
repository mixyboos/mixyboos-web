"use client";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiFindReplaceLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { GoBroadcast } from "react-icons/go";
import { MdOutlineCloudUpload } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import NavLink from "../widgets/NavLink";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const user = useUser();
  return (
    <nav className="fixed z-30 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              title="Sidebar toggler"
              id="toggleSidebarMobile"
              aria-expanded="true"
              className="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
            >
              <GiHamburgerMenu className="h-6 w-6" fill="currentColor" />
              <AiOutlineClose
                id="toggleSidebarMobileClose"
                className="hidden h-6 w-6"
                fill="currentColor"
              />
            </button>
            <Link
              href="/"
              className="ml-2 flex justify-center align-middle md:mr-24"
            >
              <Image
                className="mr-2"
                src="/img/logo.svg"
                alt="Mixyboos"
                width={24}
                height={24}
              />
              <span className=" whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
                MixyBoos
              </span>
            </Link>
          </div>
          <div className="mr-4 flex flex-row space-x-2">
            <NavLink
              title="Discover"
              href="/discover"
              icon={
                <RiFindReplaceLine className="text-cerise-800 leading-lg text-lg opacity-75 dark:text-slate-300" />
              }
            />
            <NavLink
              title="Go Live"
              href="/live"
              icon={
                <GoBroadcast className="text-cerise-800 leading-lg text-lg opacity-75 dark:text-slate-300" />
              }
            />
            <NavLink
              title="Upload"
              href="/mix/create"
              icon={
                <MdOutlineCloudUpload className="text-cerise-800 leading-lg text-lg opacity-75 dark:text-slate-300" />
              }
            />
          </div>
          <div className="flex items-center">
            <div className="-mb-1 mr-3 hidden sm:block">
              <span />
            </div>

            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:hidden"
            >
              <span className="sr-only">Search</span>
              <BsSearch
                className="h-6 w-6 text-gray-500 dark:text-gray-400"
                fill="currentColor"
              />
            </button>

            {/* {session && <NotificationsDropdownComponent session={session} />}
            {false && <AppsDropdownComponent />}
            <ThemeToggler />
            {session && <ProfileDropdown session={session} />} */}
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <UserButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
