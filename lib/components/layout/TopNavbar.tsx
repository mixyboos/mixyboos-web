'use client';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useUiStore } from '@lib/services/ui';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

const TopNavbar = () => {
  const { data: session, status } = useSession();
  const setHasHeader = useUiStore((state) => state.setHasHeader);
  const router = useRouter();
  React.useEffect(() => {
    setHasHeader(false);
  }, []);

  const classNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(' ');
  };

  const _getMenuItems = () => {
    return (
      <React.Fragment>
        {session && (
          <Link
            href="/upload"
            className={classNames(
              router.pathname === '/upload'
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'px-3 py-2 rounded-md text-sm font-medium'
            )}
          >
            Upload
          </Link>
        )}
        {session && (
          <Link
            href="/live"
            className={classNames(
              router.pathname === '/live'
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'px-3 py-2 rounded-md text-sm font-medium'
            )}
          >
            Go Live!
          </Link>
        )}
        <Link
          href="/discover"
          className={classNames(
            router.pathname === '/discover'
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'px-3 py-2 rounded-md text-sm font-medium'
          )}
        >
          Discover
        </Link>
        <Link
          href="/debug"
          className={classNames(
            router.pathname === '/debug'
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'px-3 py-2 rounded-md text-sm font-medium'
          )}
        >
          Debug
        </Link>
      </React.Fragment>
    );
  };
  return (
    <Disclosure
      as="nav"
      className="bg-gray-800"
    >
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block w-6 h-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="block w-6 h-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Link href="/">
                    <img
                      className="block w-auto h-8 lg:hidden"
                      src="/img/logo.svg"
                      alt="Mixyboos"
                    />
                    <img
                      className="hidden w-auto h-8 lg:block"
                      src="/img/logo-large.svg"
                      alt="Mixyboos"
                    />
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">{_getMenuItems()}</div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {session && (
                  <button className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon
                      className="w-6 h-6"
                      aria-hidden="true"
                    />
                  </button>
                )}
                {session ? (
                  <Menu
                    as="div"
                    className="relative ml-3"
                  >
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="w-8 h-8 rounded-full"
                              src={session?.user?.image ?? ''}
                              alt=""
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
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => signOut()}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white active:bg-gray-900 active:text-white"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">{_getMenuItems()}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default TopNavbar;
