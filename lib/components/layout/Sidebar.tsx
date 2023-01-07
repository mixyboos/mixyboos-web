'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import {
  MdHistory,
  MdOutlineCategory,
  MdOutlineDynamicFeed,
  MdOutlinePersonRemoveAlt1,
  MdOutlineQueryStats,
  MdOutlineQueueMusic,
  MdOutlineThumbUp,
  MdOutlineTrendingUp,
  MdOutlineWbIridescent,
  MdSpaceDashboard,
} from 'react-icons/md';
import { GrAssistListening } from 'react-icons/gr';
import { RiBroadcastFill } from 'react-icons/ri';

import Link from 'next/link';
import { Avatar } from 'flowbite-react';

const sidebarItems = [
  {
    id: 0,
    icon: <MdSpaceDashboard className="w-6 h-6" />,
    path: '/dashboard',
    title: 'Dashboard',
  },
  {
    id: 1,
    icon: <MdOutlinePersonRemoveAlt1 className="w-6 h-6" />,
    path: '/dashboard/my/shows',
    title: 'My Shows',
  },
  {
    id: 2,
    icon: <MdOutlineQueueMusic className="w-6 h-6" />,
    path: '/dashboard/tracks',
    title: 'My Tracks',
  },
  {
    id: 3,
    icon: <MdOutlineQueryStats className="w-6 h-6" />,
    path: '/stats',
    title: 'Stats',
  },
  {
    id: 5,
    title: 'SPACER',
  },
  {
    id: 6,
    icon: <MdOutlineDynamicFeed className="w-6 h-6" />,
    path: '/feed',
    title: 'Feed',
  },
  {
    id: 7,
    icon: <MdOutlineWbIridescent className="w-6 h-6" />,
    path: '/shows/new',
    title: 'New Shows',
  },
  {
    id: 8,
    title: 'SPACER',
  },
  {
    id: 9,
    icon: <MdOutlineThumbUp className="w-6 h-6" />,
    path: '/favourites',
    title: 'Favourites',
  },
  {
    id: 10,
    icon: <GrAssistListening className="w-6 h-6" />,
    path: '/dashboard/listen-later',
    title: 'Listen Later',
  },
  {
    id: 11,
    icon: <MdHistory className="w-6 h-6" />,
    path: '/history',
    title: 'History',
  },
  {
    id: 12,
    title: 'SPACER',
  },
  {
    id: 13,
    icon: <MdOutlineCategory className="w-6 h-6" />,
    path: '/categories',
    title: 'Categories',
  },
  {
    id: 14,
    icon: <MdOutlineTrendingUp className="w-6 h-6" />,
    path: '/trending',
    title: 'Trending',
  },
  {
    id: 15,
    icon: <RiBroadcastFill className="w-6 h-6" />,
    path: '/livenow',
    title: 'Live Now',
  },
];

const Sidebar = () => {
  const { data: session, status } = useSession();
  return session && session.user && session.user.slug ? (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 duration-200 lg:flex transition-width lg:w-64"
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-gray-50">
        <div className="flex flex-col flex-1 pt-8 pb-4 overflow-y-auto">
          <div
            className="flex-1 px-3 bg-gray-50"
            id="sidebar-items"
          >
            <div className="p-4 bg-white shadow-lg shadow-gray-200 rounded-2xl">
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-white rounded-lg bg-gradient-to-br ">
                  <Avatar
                    img={session?.user.image}
                    bordered={true}
                    rounded={true}
                    size="md"
                  />
                </div>
                <div className="flex-shrink-0 ml-3">
                  <span className="text-xl font-bold leading-none text-gray-900">
                    {session?.user.displayName}
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    <Link href={session?.user.slug as string}>
                      View Profile
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="mt-4">
              {sidebarItems.map((i) => {
                console.log('Sidebar', 'item', i, i.title);
                return i.title === 'SPACER' || !i.path ? (
                  <div>
                    <hr className="h-px my-4 border-0 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-900" />
                  </div>
                ) : (
                  <Link
                    key={i.id}
                    href={i.path}
                    className="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200"
                    sidebar-toggle-collapse=""
                  >
                    {i.icon}
                    <span
                      className="ml-3 font-medium text-gray-800 text-md"
                      sidebar-toggle-item=""
                    >
                      {i.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  ) : (
    <></>
  );
};

export default Sidebar;
