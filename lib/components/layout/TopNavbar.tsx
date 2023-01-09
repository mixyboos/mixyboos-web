'use client';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useUiStore, IUiState } from '@lib/services/ui';
import { usePathname, useRouter } from 'next/navigation';
import { Loading } from '../widgets';
import { RiFindReplaceLine } from 'react-icons/ri';
import {
  MdOutlineCloudUpload,
  MdOutlineEditNote,
  MdOutlineLogout,
  MdSpaceDashboard,
} from 'react-icons/md';
import { GoBroadcast } from 'react-icons/go';
import { DarkThemeToggle } from 'flowbite-react';
import NotificationsWidget from '../widgets/notifications/NotificationsWidget';
import logger from 'logger/logger';

const TopNavbar = () => {
  const { data: session, status } = useSession();
  const setHasHeader = useUiStore((state: IUiState) => state.setHasHeader);
  const hasSidebar = useUiStore((state: IUiState) => state.hasSidebar);
  const router = useRouter();
  const pathname = usePathname();
  const classNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(' ');
  };

  React.useEffect(() => {
    logger.debug('TopNavbar', 'session', session);
    console.log('TopNavbar', 'session', session);
  }, [session]);

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
        </Link>{' '}
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
          href="/live"
          className={classNames(
            pathname === `${session?.user.slug}/`
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
          <nav className="fixed z-30 w-full bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
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
                    className="flex items-center font-semibold text-md "
                  >
                    <img
                      className="h-6 mr-2"
                      src="/img/logo.svg"
                      alt="Mixyboos"
                    />
                    <span className="self-center invisible text-xl font-bold text-gray-700 dark:text-gray-50 md:visible whitespace-nowrap lg:mr-1.5">
                      MixyBoos
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
                    <></>
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
                        <Link
                          href="discover"
                          className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-gray-800 uppercase border border-gray-200 hover:bg-gray-200 hover:opacity-75"
                        >
                          <RiFindReplaceLine className="text-lg text-gray-800 opacity-75 leading-lg" />
                          <span className="ml-2 text-md">Discover</span>
                        </Link>
                        <Link
                          href="/live"
                          className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-gray-800 uppercase border border-gray-200 hover:bg-gray-200 hover:opacity-75"
                        >
                          <GoBroadcast className="text-lg text-gray-800 opacity-75 leading-lg" />
                          <span className="ml-2">Go Live</span>
                        </Link>
                        <Link
                          href="/mix/create"
                          className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-gray-800 uppercase border border-gray-200 hover:bg-gray-200 hover:opacity-75"
                        >
                          <MdOutlineCloudUpload className="text-lg text-gray-800 opacity-75 leading-lg" />
                          <span className="ml-2">Upload</span>
                        </Link>
                      </div>
                      <DarkThemeToggle />
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
                      <NotificationsWidget />
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
                          <Link
                            href="/profile/edit"
                            className="block p-4 text-center rounded-2xl hover:bg-gray-100"
                          >
                            <MdOutlineEditNote className="mx-auto mb-1 text-gray-500 w-7 h-7" />

                            <div className="text-sm font-medium text-gray-900">
                              Edit Profile
                            </div>
                          </Link>

                          <button
                            onClick={() => signOut({ callbackUrl: '/' })}
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
                                  src={session.user.profileImage}
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
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        href="/dashboard"
                                        className={`${
                                          active
                                            ? 'bg-violet-500 text-white'
                                            : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        <MdSpaceDashboard
                                          className="w-5 h-5 mr-2"
                                          aria-hidden="true"
                                        />
                                        Dashboard
                                      </Link>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        href="/profile/edit"
                                        className={`${
                                          active
                                            ? 'bg-violet-500 text-white'
                                            : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        <MdOutlineEditNote
                                          className="w-5 h-5 mr-2"
                                          aria-hidden="true"
                                        />
                                        Edit Profile
                                      </Link>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={() =>
                                          signOut({ callbackUrl: '/' })
                                        }
                                        className={`${
                                          active
                                            ? 'bg-violet-500 text-white'
                                            : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        <MdOutlineLogout
                                          className="w-5 h-5 mr-2"
                                          aria-hidden="true"
                                        />
                                        Sign out
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </div>
                        )}
                      </Menu>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
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
                    </Link>
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
