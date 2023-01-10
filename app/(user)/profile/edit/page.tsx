'use client';
import { Loading } from '@lib/components/widgets';
import { UserModel } from '@lib/data/models';
import ProfileService from '@lib/services/api/profileService';
import { useSession } from 'next-auth/react';
import React from 'react';

const ProfileEditPage = () => {
  const [profile, setProfile] = React.useState<UserModel>();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    const getProfile = async () => {
      debugger;
      const result = await new ProfileService().getProfileBySlug(
        session?.user.slug as string
      );
      setProfile(result);
    };
    if (session && session.user && session.user.slug) {
      getProfile();
    }
  }, [session]);

  return profile ? (
    <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-6">
      <div className="mb-4 col-span-full xl:mb-0">
        <nav
          className="flex mb-5"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-gray-700 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5 mr-2.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <a
                  href="#"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2"
                >
                  Users
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className="ml-1 text-sm font-medium text-gray-400 md:ml-2"
                  aria-current="page"
                >
                  Settings
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          User settings
        </h1>
      </div>

      <div className="col-span-full xl:col-auto">
        <div className="p-4 mb-6 bg-white shadow-lg shadow-gray-200 rounded-2xl">
          <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
            <img
              className="mb-4 rounded-lg shadow-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 shadow-gray-300"
              src={profile.profileImage}
              alt={profile.displayName}
            />
            <div>
              <h3 className="mb-1 text-2xl font-bold text-gray-900">
                {profile.displayName}
              </h3>
              <div className="mb-4 text-base font-normal text-gray-500">
                {profile.title}
              </div>
              <a
                href="#"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
              >
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                </svg>
                Change picture
              </a>
            </div>
          </div>
        </div>
        <div className="p-4 mb-6 bg-white shadow-lg shadow-gray-200 rounded-2xl">
          <h3 className="mb-4 text-xl font-bold">Language & Time</h3>
          <div className="mb-4">
            <label
              htmlFor="settings-language"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select language
            </label>
            <select
              id="settings-language"
              name="countries"
              className="border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
            >
              <option>English (US)</option>
              <option>Italiano</option>
              <option>Français (France)</option>
              <option>正體字</option>
              <option>Español (España)</option>
              <option>Deutsch</option>
              <option>Português (Brasil)</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="settings-timezone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Time Zone
            </label>
            <select
              id="settings-timezone"
              name="countries"
              className="border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
            >
              <option>GMT+0 Greenwich Mean Time (GMT)</option>
              <option>GMT+1 Central European Time (CET)</option>
              <option>GMT+2 Eastern European Time (EET)</option>
              <option>GMT+3 Moscow Time (MSK)</option>
              <option>GMT+5 Pakistan Standard Time (PKT)</option>
              <option>GMT+8 China Standard Time (CST)</option>
              <option>GMT+10 Eastern Australia Standard Time (AEST)</option>
            </select>
          </div>
          <div>
            <button className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform font-medium text-sm px-5 py-2.5 text-center">
              Save all
            </button>
          </div>
        </div>
        <div className="p-4 mb-6 bg-white shadow-lg shadow-gray-200 rounded-2xl">
          <div className="flow-root">
            <h3 className="text-xl font-bold">Social accounts</h3>
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      focusable={false}
                      data-prefix="fab"
                      data-icon="facebook-f"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="currentColor"
                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-base font-semibold text-gray-900 truncate">
                      Facebook account
                    </span>
                    <a
                      href="#"
                      className="block text-sm font-normal truncate text-fuchsia-500 hover:underline"
                    >
                      www.facebook.com/themesberg
                    </a>
                  </div>
                  <div className="inline-flex items-center">
                    <a
                      href="#"
                      className="py-2 px-3 mr-3 mb-3 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:scale-[1.02] transition-transform"
                    >
                      Disconnect
                    </a>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      focusable={false}
                      data-prefix="fab"
                      data-icon="twitter"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-base font-semibold text-gray-900 truncate">
                      Twitter account
                    </span>
                    <a
                      href="#"
                      className="block text-sm font-normal truncate text-fuchsia-500 hover:underline"
                    >
                      www.twitter.com/themesberg
                    </a>
                  </div>
                  <div className="inline-flex items-center">
                    <a
                      href="#"
                      className="py-2 px-3 mr-3 mb-3 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:scale-[1.02] transition-transform"
                    >
                      Disconnect
                    </a>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      focusable={false}
                      data-prefix="fab"
                      data-icon="github"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                    >
                      <path
                        fill="currentColor"
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-base font-semibold text-gray-900 truncate">
                      Github account
                    </span>
                    <span className="block text-sm font-normal text-gray-500 truncate">
                      Not connected
                    </span>
                  </div>
                  <div className="inline-flex items-center">
                    <a
                      href="#"
                      className="py-2 px-3 mr-3 mb-3 text-sm font-medium text-center text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                    >
                      Connect
                    </a>
                  </div>
                </div>
              </li>
              <li className="pt-4 pb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      focusable={false}
                      data-prefix="fab"
                      data-icon="dribbble"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-base font-semibold text-gray-900 truncate">
                      Dribbble account
                    </span>
                    <span className="block text-sm font-normal text-gray-500 truncate">
                      Not connected
                    </span>
                  </div>
                  <div className="inline-flex items-center">
                    <a
                      href="#"
                      className="py-2 px-3 mr-3 mb-3 text-sm font-medium text-center text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                    >
                      Connect
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div>
              <button className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform font-medium text-sm px-5 py-2.5 text-center">
                Save all
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 mb-6 bg-white shadow-lg shadow-gray-200 rounded-2xl">
          <div className="flow-root">
            <h3 className="text-xl font-bold">Other accounts</h3>
            <ul className="mb-6 divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                  <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                    <div>
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/bonnie-green.png"
                        alt="Bonnie image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5">
                        Bonnie Green
                      </p>
                      <p className="mb-1 text-sm font-normal truncate text-fuchsia-600">
                        New York, USA
                      </p>
                      <p className="text-xs font-medium text-gray-500">
                        Last seen: 1 min ago
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                    <a
                      href="#"
                      className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                    >
                      Disconnect
                    </a>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                  <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                    <div>
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/jese-leos.png"
                        alt="Jese image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5">
                        Jese Leos
                      </p>
                      <p className="mb-1 text-sm font-normal truncate text-fuchsia-600">
                        California, USA
                      </p>
                      <p className="text-xs font-medium text-gray-500">
                        Last seen: 2 min ago
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                    <a
                      href="#"
                      className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                    >
                      Disconnect
                    </a>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                  <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                    <div>
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/thomas-lean.png"
                        alt="Thomas image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5">
                        Thomas Lean
                      </p>
                      <p className="mb-1 text-sm font-normal truncate text-fuchsia-600">
                        Texas, USA
                      </p>
                      <p className="text-xs font-medium text-gray-500">
                        Last seen: 1 hour ago
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                    <a
                      href="#"
                      className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                    >
                      Disconnect
                    </a>
                  </div>
                </div>
              </li>
              <li className="pt-4">
                <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                  <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                    <div>
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/lana-byrd.png"
                        alt="Lana image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5">
                        Lana Byrd
                      </p>
                      <p className="mb-1 text-sm font-normal truncate text-fuchsia-600">
                        Texas, USA
                      </p>
                      <p className="text-xs font-medium text-gray-500">
                        Last seen: 1 hour ago
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                    <a
                      href="#"
                      className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                    >
                      Disconnect
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div>
              <button className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform font-medium text-sm px-5 py-2.5 text-center">
                Save all
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="p-4 mb-6 bg-white shadow-lg shadow-gray-200 rounded-2xl">
          <h3 className="mb-4 text-xl font-bold">General information</h3>
          <form action="#">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="Bonnie"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="Green"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="United States"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="e.g. San Francisco"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="adress"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Adress
                </label>
                <input
                  type="text"
                  name="adress"
                  id="adress"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="e.g. California"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="example@company.com"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone-number"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone-number"
                  id="phone-number"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="e.g. +(12)3456 789"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="birthday"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Birthday
                </label>
                <input
                  type="number"
                  name="birthday"
                  id="birthday"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="15/08/1990"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="organization"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="Company Name"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="React Developer"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="Development"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="zip-code"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Zip/postal code
                </label>
                <input
                  type="number"
                  name="zip-code"
                  id="zip-code"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="123456"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-full">
                <button
                  className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform font-medium text-sm px-5 py-2.5 text-center"
                  type="submit"
                >
                  Save all
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="p-4 mb-6 bg-white shadow-lg shadow-gray-200 rounded-2xl">
          <h3 className="mb-4 text-xl font-bold">Password information</h3>
          <form
            action="#"
            data-bitwarden-watching="1"
          >
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Current password
                </label>
                <input
                  type="text"
                  name="current-password"
                  id="current-password"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="new-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New password
                </label>
                <input
                  type="text"
                  name="new-password"
                  id="new-password"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="text"
                  name="confirm-password"
                  id="confirm-password"
                  className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  required
                />
              </div>
              <div className="col-span-full">
                <div className="text-sm font-medium">
                  Password requirements:
                </div>
                <div className="mb-1 text-sm font-normal text-gray-500">
                  Ensure that these requirements are met:
                </div>
                <ul className="pl-4 space-y-1 text-gray-500">
                  <li className="text-xs font-normal">
                    At least 10 characters (and up to 100 characters)
                  </li>
                  <li className="text-xs font-normal">
                    At least one lowercase character
                  </li>
                  <li className="text-xs font-normal">
                    Inclusion of at least one special character, e.g., ! @ # ?
                  </li>
                  <li className="text-xs font-normal">Some text here zoltan</li>
                </ul>
              </div>
              <div className="col-span-6 sm:col-full">
                <button
                  className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform font-medium text-sm px-5 py-2.5 text-center"
                  type="submit"
                >
                  Save all
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="p-4 mb-4 bg-white shadow-lg shadow-gray-200 rounded-2xl xl:mb-0">
          <div className="flow-root">
            <h3 className="text-xl font-bold">Sessions</h3>
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">
                      California 123.123.123.123
                    </p>
                    <p className="text-sm font-normal text-gray-500 truncate">
                      Chrome on macOS
                    </p>
                  </div>
                  <div className="inline-flex items-center">
                    <a
                      href="#"
                      className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                    >
                      Revoke
                    </a>
                  </div>
                </div>
              </li>
              <li className="pt-4 pb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">
                      Rome 24.456.355.98
                    </p>
                    <p className="text-sm font-normal text-gray-500 truncate">
                      Safari on iPhone
                    </p>
                  </div>
                  <div className="inline-flex items-center">
                    <a
                      href="#"
                      className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                    >
                      Revoke
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div>
              <button className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform font-medium text-sm px-5 py-2.5 text-center">
                See more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
export default ProfileEditPage;
