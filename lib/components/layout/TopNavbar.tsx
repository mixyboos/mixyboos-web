'use client';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useUiStore, IUiState } from '@lib/services/ui';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter } from 'next/navigation';
import { Loading } from '../widgets';
import { RiFindReplaceLine } from 'react-icons/ri';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { GoBroadcast } from 'react-icons/go';

const TopNavbar = () => {
  const { data: session, status } = useSession();
  const setHasHeader = useUiStore((state: IUiState) => state.setHasHeader);
  const hasSidebar = useUiStore((state: IUiState) => state.hasSidebar);
  const router = useRouter();
  const pathname = usePathname();
  const classNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(' ');
  };

  const _getMenuItems = () => {
    return (
      <React.Fragment>
        <Link
          href="/discover"
          className={classNames(
            pathname === '/discover'
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'px-3 py-2 rounded-md text-sm font-medium'
          )}
        >
          Discover
        </Link>
        <Link
          href={session ? '/upload' : '/auth/login'}
          className={classNames(
            pathname === '/upload'
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'px-3 py-2 rounded-md text-sm font-medium'
          )}
        >
          Upload
        </Link>
        <Link
          href={session ? '/live' : '/auth/login'}
          className={classNames(
            pathname === '/live'
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'px-3 py-2 rounded-md text-sm font-medium'
          )}
        >
          Go Live!
        </Link>
      </React.Fragment>
    );
  };
  return status === 'loading' ? (
    <Loading />
  ) : (
    <Disclosure
      as="nav"
      className="bg-gray-800"
    >
      {({ open }) => (
        <>
          <nav className="fixed z-30 w-full bg-gray-50">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  {hasSidebar && (
                    <>
                      <button
                        id="toggleSidebar"
                        title="Sidebar Toggler"
                        className="hidden p-2 mr-4 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        id="toggleSidebarMobile"
                        title="toggleSidebarMobile"
                        className="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
                      >
                        <svg
                          id="toggleSidebarMobileHamburger"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          id="toggleSidebarMobileClose"
                          className="hidden w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  <Link
                    href="/"
                    className="text-md font-semibold flex items-center lg:mr-1.5"
                  >
                    <img
                      className="h-6 mr-2"
                      src="/img/logo.svg"
                      alt="Mixyboos"
                    />
                    <span className="self-center hidden text-xl font-bold text-gray-700 md:inline-block whitespace-nowrap">
                      MixyBoos Music Machine
                    </span>
                  </Link>
                  {status === 'authenticated' ? (
                    <form
                      action="#"
                      method="GET"
                      className="hidden lg:block lg:pl-8"
                    >
                      <label
                        htmlFor="topbar-search"
                        className="sr-only"
                      >
                        Search
                      </label>
                      <div className="relative mt-1 lg:w-80">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="email"
                          id="topbar-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full pl-10 p-2.5"
                          placeholder="Search"
                        />
                      </div>
                    </form>
                  ) : (
                    <div className="hidden sm:flex sm:ml-6">
                      <ul className="flex space-x-8">
                        <li>
                          <Link
                            href="/upload"
                            className="text-sm font-medium text-gray-700 hover:text-fuchsia-500"
                            aria-current="page"
                          >
                            Live
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/categories"
                            className="text-sm font-medium text-gray-700 hover:text-fuchsia-500"
                            aria-current="page"
                          >
                            Categories
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/upload"
                            className="text-sm font-medium text-gray-700 hover:text-fuchsia-500"
                            aria-current="page"
                          >
                            Upload
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <button
                    id="toggleSidebarMobileSearch"
                    type="button"
                    className="p-2 text-gray-500 rounded-2xl lg:hidden hover:text-gray-900 hover:bg-gray-100"
                  >
                    <span className="sr-only">Search</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {session ? (
                    <>
                      <div className="flex flex-row mr-4 space-x-2">
                        <a
                          href="discover"
                          className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-gray-800 uppercase border border-gray-200 hover:bg-gray-200 hover:opacity-75"
                        >
                          <RiFindReplaceLine className="text-lg text-gray-800 opacity-75 leading-lg" />
                          <span className="ml-2 text-md">Discover</span>
                        </a>
                        <a
                          href="live"
                          className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-gray-800 uppercase border border-gray-200 hover:bg-gray-200 hover:opacity-75"
                        >
                          <GoBroadcast className="text-lg text-gray-800 opacity-75 leading-lg" />
                          <span className="ml-2">Go Live</span>
                        </a>
                        <a
                          href="upload"
                          className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-gray-800 uppercase border border-gray-200 hover:bg-gray-200 hover:opacity-75"
                        >
                          <MdOutlineCloudUpload className="text-lg text-gray-800 opacity-75 leading-lg" />
                          <span className="ml-2">Upload</span>
                        </a>
                      </div>
                      <button
                        type="button"
                        data-dropdown-toggle="notification-dropdown"
                        className="p-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100"
                      >
                        <span className="sr-only">View notifications</span>
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                      <div
                        className="z-50 hidden max-w-sm my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg shadow-gray-300"
                        id="notification-dropdown"
                        style={{
                          position: 'absolute',
                          inset: '0px auto auto 0px',
                          margin: 0,
                          transform: 'translate3d(929px, 65px, 0px)',
                        }}
                        data-popper-placement="bottom"
                      >
                        <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50">
                          Notifications
                        </div>
                        <div>
                          <a
                            href="#"
                            className="flex px-4 py-3 border-b hover:bg-gray-100"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="rounded-full w-11 h-11"
                                src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/bonnie-green.png"
                                alt="Jese image"
                              />
                              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-fuchsia-600">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                                </svg>
                              </div>
                            </div>
                            <div className="w-full pl-3">
                              <div className="text-gray-500 font-normal text-sm mb-1.5">
                                New message from
                                <span className="font-semibold text-gray-900">
                                  Bonnie Green
                                </span>
                                Words are hard
                              </div>
                              <div className="text-xs font-medium text-fuchsia-500">
                                a few moments ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex px-4 py-3 border-b hover:bg-gray-100"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="rounded-full w-11 h-11"
                                src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/jese-leos.png"
                                alt="Jese image"
                              />
                              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                              </div>
                            </div>
                            <div className="w-full pl-3">
                              <div className="text-gray-500 font-normal text-sm mb-1.5">
                                <span className="font-semibold text-gray-900">
                                  Jese leos
                                </span>
                                and
                                <span className="font-medium text-gray-900">
                                  5 others
                                </span>
                                started following you.
                              </div>
                              <div className="text-xs font-medium text-fuchsia-500">
                                10 minutes ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex px-4 py-3 border-b hover:bg-gray-100"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="rounded-full w-11 h-11"
                                src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/joseph-mcfall.png"
                                alt="Joseph image"
                              />
                              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-red-600 border border-white rounded-full">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="w-full pl-3">
                              <div className="text-gray-500 font-normal text-sm mb-1.5">
                                <span className="font-semibold text-gray-900">
                                  Joseph Mcfall
                                </span>
                                and
                                <span className="font-medium text-gray-900">
                                  141 others
                                </span>
                                love your story. See it and view more stories.
                              </div>
                              <div className="text-xs font-medium text-fuchsia-500">
                                44 minutes ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex px-4 py-3 border-b hover:bg-gray-100"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="rounded-full w-11 h-11"
                                src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/leslie-livingston.png"
                                alt="Leslie image"
                              />
                              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="w-full pl-3">
                              <div className="text-gray-500 font-normal text-sm mb-1.5">
                                <span className="font-semibold text-gray-900">
                                  Leslie Livingston
                                </span>
                                mentioned you in a comment:
                                <span className="font-medium text-teal-500">
                                  @bonnie.green
                                </span>
                                what do you say?
                              </div>
                              <div className="text-xs font-medium text-fuchsia-500">
                                1 hour ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex px-4 py-3 hover:bg-gray-100"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="rounded-full w-11 h-11"
                                src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/robert-brown.png"
                                alt="Robert image"
                              />
                              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                </svg>
                              </div>
                            </div>
                            <div className="w-full pl-3">
                              <div className="text-gray-500 font-normal text-sm mb-1.5">
                                <span className="font-semibold text-gray-900">
                                  Robert Brown
                                </span>
                                posted a new video: Glassmorphism - learn how to
                                implement the new design trend.
                              </div>
                              <div className="text-xs font-medium text-fuchsia-500">
                                3 hours ago
                              </div>
                            </div>
                          </a>
                        </div>
                        <a
                          href="#"
                          className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="inline-flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            View all
                          </div>
                        </a>
                      </div>
                      <button
                        type="button"
                        data-dropdown-toggle="apps-dropdown"
                        className="p-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100"
                      >
                        <span className="sr-only">View notifications</span>
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <div
                        className="z-50 hidden max-w-sm my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg shadow-gray-300"
                        id="apps-dropdown"
                        style={{
                          position: 'absolute',
                          inset: '0px auto auto 0px',
                          margin: 0,
                          transform: 'translate3d(969px, 65px, 0px)',
                        }}
                        data-popper-placement="bottom"
                      >
                        <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50">
                          Apps
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <a
                            href="#"
                            className="block p-4 text-center rounded-2xl hover:bg-gray-100"
                          >
                            <svg
                              className="mx-auto mb-1 text-gray-500 w-7 h-7"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">
                              Sales
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block p-4 text-center rounded-2xl hover:bg-gray-100"
                          >
                            <svg
                              className="mx-auto mb-1 text-gray-500 w-7 h-7"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">
                              Users
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block p-4 text-center rounded-2xl hover:bg-gray-100"
                          >
                            <svg
                              className="mx-auto mb-1 text-gray-500 w-7 h-7"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">
                              Inbox
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block p-4 text-center rounded-2xl hover:bg-gray-100"
                          >
                            <svg
                              className="mx-auto mb-1 text-gray-500 w-7 h-7"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">
                              Profile
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block p-4 text-center rounded-2xl hover:bg-gray-100"
                          >
                            <svg
                              className="mx-auto mb-1 text-gray-500 w-7 h-7"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">
                              Settings
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block p-4 text-center rounded-2xl hover:bg-gray-100"
                          >
                            <svg
                              className="mx-auto mb-1 text-gray-500 w-7 h-7"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                              <path
                                fillRule="evenodd"
                                d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">
                              Products
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block p-4 text-center rounded-2xl hover:bg-gray-100"
                          >
                            <svg
                              className="mx-auto mb-1 text-gray-500 w-7 h-7"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">
                              Pricing
                            </div>
                          </a>

                          <button
                            onClick={() => signOut()}
                            className="block p-4 text-center rounded-2xl hover:bg-gray-100"
                          >
                            <svg
                              className="mx-auto mb-1 text-gray-500 w-7 h-7"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                              />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">
                              Logout
                            </div>
                          </button>
                        </div>
                      </div>
                      <Menu
                        as="div"
                        className="relative ml-3"
                      >
                        {({ open }) => (
                          <div className="ml-3">
                            <div>
                              <Menu.Button
                                type="button"
                                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                              >
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="w-8 h-8 rounded-full"
                                  src={session.user.image}
                                  alt="user photo"
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={React.Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      className="px-4 py-3"
                                      role="none"
                                    >
                                      <p
                                        className="text-sm"
                                        role="none"
                                      >
                                        {session.user.displayName}
                                      </p>
                                      <p
                                        className="text-sm font-medium text-gray-900 truncate"
                                        role="none"
                                      >
                                        {session.user.email}
                                      </p>
                                    </div>
                                  )}
                                </Menu.Item>
                                <ul
                                  className="py-1"
                                  role="none"
                                >
                                  <Menu.Item>
                                    {({ active }) => (
                                      <li>
                                        <a
                                          href="#"
                                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          role="menuitem"
                                        >
                                          Dashboard
                                        </a>
                                      </li>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <li>
                                        <button
                                          onClick={() => signOut()}
                                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          role="menuitem"
                                        >
                                          Sign out
                                        </button>
                                      </li>
                                    )}
                                  </Menu.Item>
                                </ul>
                              </Menu.Items>
                            </Transition>
                          </div>
                        )}
                      </Menu>
                    </>
                  ) : (
                    <button
                      onClick={() => signIn()}
                      className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3"
                    >
                      <svg
                        className="w-5 h-5 mr-2 -ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Login/Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">{_getMenuItems()}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default TopNavbar;
