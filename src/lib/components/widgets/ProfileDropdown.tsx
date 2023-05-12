import React from "react";
import type { Session } from "next-auth";
import { Menu, Transition } from "@headlessui/react";
import UserImage from "@/lib/components/widgets/UserImage";
import Link from "next/link";
import {
  MdOutlineEditNote,
  MdOutlineLogout,
  MdSpaceDashboard,
} from "react-icons/md";
import { signOut } from "next-auth/react";

type ProfileDropdownProps = {
  session: Session;
};

const ProfileDropdown = ({ session }: ProfileDropdownProps) => {
  if (!session) return null;
  return (
    <Menu as="div" className="relative ml-3">
      {({ open }) => (
        <div className="ml-3">
          <div>
            <Menu.Button
              type="button"
              className="bg-cerise-800 focus:ring-cerise-300 flex rounded-full text-sm focus:ring-4"
            >
              <span className="sr-only">Open user menu</span>
              <UserImage
                src={session.user.image || "/img/default-avatar.png"}
                size={"sm"}
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
              className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm" role="none">
                      <Link href={`/${session.user.slug}`}>
                        {session.user.displayName}
                      </Link>
                    </p>
                    <p
                      className="text-cerise-900 truncate text-sm font-medium"
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
                        active ? "bg-violet-500 text-white" : "text-cerise-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdSpaceDashboard
                        className="mr-2 h-5 w-5"
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
                        active ? "bg-violet-500 text-white" : "text-cerise-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdOutlineEditNote
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Edit Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={async () =>
                        (await signOut({ callbackUrl: "/" })) as void
                      }
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-cerise-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdOutlineLogout
                        className="mr-2 h-5 w-5"
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
  );
};

export default ProfileDropdown;
