"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiTrendingUp } from "react-icons/fi";
import { BsPersonBoundingBox, BsPersonVcard } from "react-icons/bs";
import {
  MdDynamicFeed,
  MdFavoriteBorder,
  MdMusicVideo,
  MdOutlineRecentActors,
  MdQueryStats,
} from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { BiCategoryAlt } from "react-icons/bi";
import Loading from "../../widgets/Loading";
import UserImage from "../../widgets/UserImage";

type DashboardSidebarProps = {
  session: Session | undefined;
};

const DashboardSidebar = ({ session }: DashboardSidebarProps) => {
  const router = useRouter();
  const _sidebarItemClick = (path: string | undefined): void => {
    if (!path) return;
    if (path.includes("dashboard")) {
    } else {
      router.push(path);
    }
  };

  if (!session?.user) return <Loading />;

  return (
    <div className="h-full w-60 space-y-2 p-3 dark:bg-slate-900 dark:text-gray-100">
      <div className="flex items-center space-x-4 p-2">
        {session.user.image && (
          <UserImage src={session.user.image} status={"offline"} size={"md"} />
        )}
        <div>
          <h2 className="text-lg font-semibold">
            {session.user.name || "Argle Bargle"}
          </h2>
          <span className="flex items-center space-x-1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-xs hover:underline dark:text-gray-400"
            >
              {session.user.biography || "Hello Lover"}
            </a>
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-700">
        <ul className="space-y-1 pb-4 pt-2 text-sm">
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="dashboard/shows"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <BsPersonVcard className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>My Shows</span>
            </Link>
          </li>
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="dashboard/mixes"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <BsPersonBoundingBox className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>My Mixes</span>
            </Link>
          </li>
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="stats"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <MdQueryStats className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>Stats</span>
            </Link>
          </li>
        </ul>
        <ul className="space-y-1 pb-2 pt-4 text-sm">
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="feed"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <MdDynamicFeed className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>Feed</span>
            </Link>
          </li>
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="/shows/new"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <MdOutlineRecentActors className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>New Shows</span>
            </Link>
          </li>
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="favourites"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <MdFavoriteBorder className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>Favourites</span>
            </Link>
          </li>
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="/dashboard/listen-later"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <CgSandClock className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>Listen Later</span>
            </Link>
          </li>
        </ul>{" "}
        <ul className="space-y-1 pb-2 pt-4 text-sm">
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="categories"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <BiCategoryAlt className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>Categories</span>
            </Link>
          </li>
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="trending"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <FiTrendingUp className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>Trending</span>
            </Link>
          </li>
          <li className="dark:bg-slate-800 dark:text-gray-50">
            <Link
              rel="noopener noreferrer"
              href="livenow"
              className="flex items-center space-x-3 rounded-md p-2"
            >
              <MdMusicVideo className="h-5 w-5 fill-current dark:text-gray-400" />
              <span>Live Now</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
