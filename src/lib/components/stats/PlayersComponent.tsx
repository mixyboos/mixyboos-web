import React from "react";

const PlayersComponent = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
        Statistics this month
        <button
          data-popover-target="popover-description"
          data-popover-placement="bottom-end"
          type="button"
        >
          <svg
            className="ml-2 h-4 w-4 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Show information</span>
        </button>
      </h3>
      <div
        data-popover=""
        id="popover-description"
        role="tooltip"
        className="invisible absolute z-10 inline-block w-72 rounded-lg border border-gray-200 bg-white text-sm font-light text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
        style={{
          position: "absolute",
          inset: "0px 0px auto auto",
          margin: 0,
          transform: "translate3d(-320.5px, 81px, 0px)",
        }}
        data-popper-placement="bottom-end"
      >
        <div className="space-y-2 p-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Statistics
          </h3>
          <p>
            Statistics is a branch of applied mathematics that involves the
            collection, description, analysis, and inference of conclusions from
            quantitative data.
          </p>
          <a
            href="#"
            className="text-primary-600 dark:text-primary-500 dark:hover:text-primary-600 hover:text-primary-700 flex items-center font-medium"
          >
            Read more{" "}
            <svg
              className="ml-1 h-4 w-4"
              aria-hidden="true"
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
          </a>
        </div>
        <div
          data-popper-arrow=""
          style={{
            position: "absolute",
            left: 0,
            transform: "translate3d(271px, 0px, 0px)",
          }}
        />
      </div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select tab
        </label>
        <select
          id="tabs"
          className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-t-lg border-0 border-b border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        >
          <option>Statistics</option>
          <option>Services</option>
          <option>FAQ</option>
        </select>
      </div>
      <ul
        className="hidden divide-x divide-gray-200 rounded-lg text-center text-sm font-medium text-gray-500 dark:divide-gray-600 dark:text-gray-400 sm:flex"
        id="fullWidthTab"
        data-tabs-toggle="#fullWidthTabContent"
        role="tablist"
      >
        <li className="w-full">
          <button
            id="faq-tab"
            data-tabs-target="#faq"
            type="button"
            role="tab"
            aria-controls="faq"
            aria-selected="true"
            className="inline-block w-full rounded-tl-lg border-blue-600 bg-gray-50 p-4 text-blue-600 hover:bg-gray-100 hover:text-blue-600 focus:outline-none dark:border-blue-500 dark:bg-gray-700 dark:text-blue-500 dark:hover:bg-gray-600 dark:hover:text-blue-500"
          >
            Top products
          </button>
        </li>
        <li className="w-full">
          <button
            id="about-tab"
            data-tabs-target="#about"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected="false"
            className="inline-block w-full rounded-tr-lg border-gray-100 bg-gray-50 p-4 text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:border-gray-700 dark:border-transparent dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-300"
          >
            Top Customers
          </button>
        </li>
      </ul>
      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600"
      >
        <div
          className="pt-4"
          id="faq"
          role="tabpanel"
          aria-labelledby="faq-tab"
        >
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center">
                  <img
                    className="h-10 w-10 flex-shrink-0"
                    src="https://placekeanu.com/200/150"
                    alt="imac image"
                  />
                  <div className="ml-3">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      iPhone 14 Pro
                    </p>
                    <div className="flex flex-1 items-center justify-end text-sm text-green-500 dark:text-green-400">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                        />
                      </svg>
                      2.5%
                      <span className="ml-2 text-gray-500">vs last month</span>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $445,467
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center">
                  <img
                    className="h-10 w-10 flex-shrink-0"
                    src="https://placekeanu.com/200/150"
                    alt="imac image"
                  />
                  <div className="ml-3">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      Apple iMac 27"
                    </p>
                    <div className="flex flex-1 items-center justify-end text-sm text-green-500 dark:text-green-400">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                        />
                      </svg>
                      12.5%
                      <span className="ml-2 text-gray-500">vs last month</span>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $256,982
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center">
                  <img
                    className="h-10 w-10 flex-shrink-0"
                    src="https://placekeanu.com/200/150"
                    alt="watch image"
                  />
                  <div className="ml-3">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      Apple Watch SE
                    </p>
                    <div className="flex flex-1 items-center justify-end text-sm text-red-600 dark:text-red-500">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                        />
                      </svg>
                      1.35%
                      <span className="ml-2 text-gray-500">vs last month</span>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $201,869
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center">
                  <img
                    className="h-10 w-10 flex-shrink-0"
                    src="https://placekeanu.com/200/150"
                    alt="ipad image"
                  />
                  <div className="ml-3">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      Apple iPad Air
                    </p>
                    <div className="flex flex-1 items-center justify-end text-sm text-green-500 dark:text-green-400">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                        />
                      </svg>
                      12.5%
                      <span className="ml-2 text-gray-500">vs last month</span>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $103,967
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center">
                  <img
                    className="h-10 w-10 flex-shrink-0"
                    src="https://placekeanu.com/200/150"
                    alt="imac image"
                  />
                  <div className="ml-3">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      Apple iMac 24"
                    </p>
                    <div className="flex flex-1 items-center justify-end text-sm text-red-600 dark:text-red-500">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                        />
                      </svg>
                      2%
                      <span className="ml-2 text-gray-500">vs last month</span>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $98,543
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          className="hidden pt-4"
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://placekeanu.com/200/150"
                    alt="Neil image"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    Neil Sims
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@mixyboos.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $3320
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://placekeanu.com/200/150"
                    alt="Neil image"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    Bonnie Green
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@mixyboos.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $2467
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://placekeanu.com/200/150"
                    alt="Neil image"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    Michael Gough
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@miyboos.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $2235
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://placekeanu.com/200/150"
                    alt="Neil image"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    Thomes Lean
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@mixyboos.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $1842
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://placekeanu.com/200/150"
                    alt="Neil image"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    Lana Byrd
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@mixyboos.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $1044
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Card Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <div>
          <button
            className="inline-flex items-center rounded-lg p-2 text-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            type="button"
            data-dropdown-toggle="stats-dropdown"
          >
            Last 7 days{" "}
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            className="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
            id="stats-dropdown"
            style={{
              position: "absolute",
              inset: "0px auto auto 0px",
              margin: 0,
              transform: "translate3d(940px, 701px, 0px)",
            }}
            data-popper-placement="bottom"
          >
            <div className="px-4 py-3" role="none">
              <p
                className="truncate text-sm font-medium text-gray-900 dark:text-white"
                role="none"
              >
                Sep 16, 2021 - Sep 22, 2021
              </p>
            </div>
            <ul className="py-1" role="none">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Yesterday
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Today
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Last 7 days
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Last 30 days
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  Last 90 days
                </a>
              </li>
            </ul>
            <div className="py-1" role="none">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Custom...
              </a>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <a
            href="#"
            className="text-primary-700 dark:text-primary-500 inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase hover:bg-gray-100 dark:hover:bg-gray-700 sm:text-sm"
          >
            Full Report
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlayersComponent;
