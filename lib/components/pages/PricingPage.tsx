import React from 'react';

const PricingPage = () => {
  return (
    <div className="container px-4 pt-32 mx-auto text-center xl:px-32 lg:px-0">
      <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight">
        See our pricing
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 xl:px-80 sm:text-xl">
        All types of businesses need access to development resources, so we give
        you the option to decide how much you need to use.
      </p>
      <div className="flex p-1 mx-auto bg-gray-200 rounded-lg sm:mt-8 max-w-fit">
        <button
          type="button"
          className="py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 rounded-md shadow whitespace-nowrap shadow-gray-300 focus:outline-none sm:w-auto sm:px-8"
        >
          Monthly
        </button>
        <button
          type="button"
          className="ml-0.5 relative border border-transparent rounded-md py-2 w-1/2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none sm:w-auto sm:px-8"
        >
          Annual <span className="text-green-500">-20%</span>
        </button>
      </div>
      <section className="grid grid-cols-1 pt-12 space-y-12 lg:space-y-0 lg:grid-cols-3 lg:gap-x-6 xl-gap-8">
        <div className="flex flex-col p-6 bg-white shadow-xl rounded-2xl shadow-gray-200 xl:p-8">
          <div className="flex-1">
            <h3 className="mb-4 text-2xl font-semibold text-gray-500">
              Freelancer
            </h3>
            <div className="flex items-baseline justify-center text-gray-900">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">49</span>
              <span className="ml-1 text-xl font-normal text-gray-500">
                /month
              </span>
            </div>
            <ul
              role="list"
              className="space-y-5 my-7"
            >
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  2 team members
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  20GB Cloud storage
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  Integration help
                </span>
              </li>
              <li className="flex space-x-3 line-through">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  Sketch Files
                </span>
              </li>
              <li className="flex space-x-3 line-through">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  API Access
                </span>
              </li>
              <li className="flex space-x-3 line-through">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  Complete documentation
                </span>
              </li>
              <li className="flex space-x-3 line-through">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  24×7 phone & email support
                </span>
              </li>
            </ul>
          </div>
          <a
            href="#"
            className="text-white bg-gradient-to-br from-dark-700 to-dark-900 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Choose plan
          </a>
        </div>
        <div className="flex flex-col p-6 bg-white shadow-xl rounded-2xl shadow-gray-200 xl:p-8">
          <div className="flex-1">
            <h3 className="mb-4 text-2xl font-semibold text-gray-500">
              Company
            </h3>
            <div className="flex items-baseline justify-center text-gray-900">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">99</span>
              <span className="ml-1 text-xl font-normal text-gray-500">
                /month
              </span>
            </div>
            <ul
              role="list"
              className="space-y-5 my-7"
            >
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  2 team members
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  20GB Cloud storage
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  Integration help
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  Sketch Files
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  API Access
                </span>
              </li>
              <li className="flex space-x-3 line-through">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  Complete documentation
                </span>
              </li>
              <li className="flex space-x-3 line-through">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  24×7 phone & email support
                </span>
              </li>
            </ul>
          </div>
          <a
            href="#"
            className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Choose plan
          </a>
        </div>
        <div className="flex flex-col p-6 bg-white shadow-xl rounded-2xl shadow-gray-200 xl:p-8">
          <div className="flex-1">
            <h3 className="mb-4 text-2xl font-semibold text-gray-500">
              Enterprise
            </h3>
            <div className="flex items-baseline justify-center text-gray-900">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">
                299
              </span>
              <span className="ml-1 text-xl font-normal text-gray-500">
                /month
              </span>
            </div>
            <ul
              role="list"
              className="space-y-5 my-7"
            >
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  2 team members
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  20GB Cloud storage
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  Integration help
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  Sketch Files
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  API Access
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  Complete documentation
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500">
                  24×7 phone & email support
                </span>
              </li>
            </ul>
          </div>
          <a
            href="#"
            className="text-white bg-gradient-to-br from-dark-700 to-dark-900 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Choose plan
          </a>
        </div>
      </section>
      <section className="py-8 lg:py-24">
        <div className="max-w-screen-xl px-4 mx-auto text-center lg:px-36">
          <span className="text-sm font-normal text-gray-400">
            More than 50+ brands trust Soft
          </span>
          <div className="flex flex-wrap items-center justify-center mt-8 lg:justify-between">
            <a
              className="mb-5 mr-3 text-gray-500 hover:text-gray-900 lg:mb-0"
              href="https://news.ycombinator.com/item?id=28561468"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <svg
                className="h-8"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 145 30"
              >
                <g>
                  <rect
                    x="{0}"
                    fill="currentColor"
                    width="{30}"
                    height="{30}"
                  />
                  <path
                    fill="#FFF"
                    d="M14,17L8.8,7.3h2.4l3,6.1c0,0.1,0.1,0.2,0.2,0.3c0.1,0.1,0.1,0.2,0.2,0.4 c0,0,0.1,0.1,0.1,0.1c0,0,0,0.1,0,0.1c0.1,0.2,0.1,0.3,0.2,0.5c0.1,0.1,0.1,0.3,0.2,0.4c0.1-0.3,0.3-0.5,0.4-0.9 c0.1-0.3,0.3-0.6,0.5-0.9L19,7.3h2.2L16,17.1v6.2h-2V17z"
                  />
                </g>
                <g>
                  <path
                    fill="currentColor"
                    d="M43.7,5.8c1.5,0,2.8,0.4,3.8,1.2l-1,1.2c-0.9-0.6-1.8-1-2.9-1c-1.7,0-3,0.9-3.7,2.6 c-0.4,1-0.6,2.3-0.6,4c0,1.3,0.2,2.4,0.5,3.2c0.8,1.9,2.1,2.8,4.1,2.8c1.1,0,2.1-0.3,3-1l1,1.3c-1.3,0.8-2.7,1.2-4.2,1.2 c-1.8,0-3.3-0.7-4.5-2.2c-1.2-1.4-1.7-3.3-1.7-5.6c0-2.3,0.6-4.1,1.8-5.6C40.4,6.6,41.9,5.8,43.7,5.8z"
                  />
                  <path
                    fill="currentColor"
                    d="M49.4,15.7c0-1.8,0.4-3.2,1.3-4.2s2-1.6,3.4-1.6c1.6,0,2.9,0.6,3.8,1.9c0.7,1,1,2.4,1,4.1 c0,2-0.6,3.6-1.7,4.6c-0.8,0.7-1.8,1.1-3,1.1c-1.5,0-2.6-0.5-3.5-1.6C49.8,19,49.4,17.5,49.4,15.7z M56.4,12.8 c-0.5-0.9-1.2-1.4-2.3-1.4c-1.1,0-1.8,0.4-2.3,1.2c-0.4,0.6-0.5,1.6-0.5,2.9c0,1.7,0.2,2.9,0.7,3.6c0.5,0.7,1.2,1.1,2.2,1.1 c1.2,0,2-0.6,2.4-1.7c0.2-0.6,0.3-1.4,0.3-2.4C57,14.6,56.8,13.5,56.4,12.8z"
                  />
                  <path
                    fill="currentColor"
                    d="M62.1,13c0-1.1-0.1-2-0.4-2.7l1.7-0.4c0.3,0.5,0.4,1.1,0.4,1.6v0.1 c0.4-0.4,0.8-0.8,1.4-1.1c0.7-0.4,1.3-0.6,1.9-0.6c0.9,0,1.7,0.4,2.2,1.1c0.1,0.2,0.3,0.5,0.4,0.7c1.2-1.2,2.3-1.8,3.5-1.8 c0.8,0,1.5,0.3,2,0.8c0.5,0.6,0.8,1.3,0.8,2.1v8.3h-1.8v-8.2c0-1.1-0.5-1.6-1.4-1.6c-0.5,0-1.1,0.2-1.6,0.6 c-0.2,0.2-0.6,0.5-1.1,0.9l-0.2,0.2v8.1H68v-7.8c0-0.7-0.1-1.2-0.3-1.4c-0.3-0.3-0.6-0.4-1.1-0.4c-0.8,0-1.7,0.5-2.8,1.5v8.2h-1.7 V13z"
                  />
                  <path
                    fill="currentColor"
                    d="M79.1,5.4L80.9,5c0.2,0.8,0.3,1.7,0.3,2.8v2.5c0,0.6,0,1,0,1.2c1-1,2.1-1.5,3.2-1.5 c1.3,0,2.4,0.5,3.1,1.5c0.8,1,1.2,2.4,1.2,4.1c0,1.8-0.4,3.2-1.2,4.3c-0.8,1.1-1.9,1.6-3.2,1.6c-0.6,0-1.1-0.1-1.7-0.4 c-0.6-0.3-1-0.6-1.3-1c-0.1,0.5-0.2,0.9-0.3,1.2h-1.7c0.2-0.5,0.3-1.4,0.3-2.8V8C79.5,6.8,79.4,5.9,79.1,5.4z M82,12.2 c-0.3,0.2-0.6,0.5-0.8,0.8v5.7c0.7,0.9,1.6,1.3,2.7,1.3c0.9,0,1.6-0.3,2-1c0.5-0.8,0.8-1.9,0.8-3.5c0-1.4-0.2-2.4-0.7-3 c-0.4-0.6-1.1-0.9-2.1-0.9C83.3,11.5,82.6,11.7,82,12.2z"
                  />
                  <path
                    fill="currentColor"
                    d="M91.3,6.8c0-0.4,0.1-0.7,0.4-1c0.3-0.3,0.6-0.4,1-0.4c0.4,0,0.7,0.1,1,0.4 c0.3,0.3,0.4,0.6,0.4,1c0,0.4-0.1,0.7-0.4,1c-0.3,0.3-0.6,0.4-1,0.4c-0.4,0-0.7-0.1-1-0.4C91.4,7.5,91.3,7.2,91.3,6.8z M91.7,21.2 v-11l1.8-0.3v11.3H91.7z"
                  />
                  <path
                    fill="currentColor"
                    d="M97.4,13c0-0.8,0-1.3-0.1-1.5c0-0.3-0.2-0.6-0.4-1.1l1.7-0.5c0.3,0.6,0.4,1.1,0.4,1.7 c1.1-1.1,2.3-1.7,3.5-1.7c0.6,0,1.1,0.1,1.6,0.4s0.9,0.7,1.1,1.2c0.2,0.4,0.3,0.8,0.3,1.3v8.4h-1.7v-7.5c0-0.9-0.1-1.5-0.4-1.8 c-0.3-0.3-0.7-0.5-1.2-0.5c-0.4,0-1,0.2-1.6,0.5c-0.6,0.3-1.1,0.7-1.5,1.1v8.2h-1.7V13z"
                  />
                  <path
                    fill="currentColor"
                    d="M109.5,12.6l-0.9-1.2c1.5-1,3-1.5,4.6-1.5c1.6,0,2.6,0.6,3.1,1.7c0.2,0.4,0.2,1,0.2,1.9 v0.6l-0.1,3.6c0,0.1,0,0.3,0,0.5c0,0.6,0,1,0.1,1.3c0.1,0.4,0.4,0.7,0.8,0.9l-0.9,1.2c-0.8-0.3-1.3-0.8-1.5-1.6 c-1,1-2.1,1.5-3.2,1.5s-2-0.3-2.7-0.9c-0.6-0.5-0.9-1.3-0.9-2.3c0-1.3,0.5-2.2,1.5-2.9c1-0.7,2.5-1,4.3-1c0.3,0,0.5,0,0.8,0v-0.8 c0-0.9-0.1-1.5-0.4-1.7c-0.4-0.4-0.8-0.6-1.5-0.6c-0.6,0-1.3,0.2-2.1,0.5C110.4,12,110,12.3,109.5,12.6z M114.8,18.5l0.1-2.9 c-0.5,0-0.8,0-0.9,0c-1.6,0-2.6,0.3-3.2,0.9c-0.4,0.4-0.6,1-0.6,1.8c0,1.3,0.6,2,1.9,2C113.3,20.2,114.2,19.6,114.8,18.5z"
                  />
                  <path
                    fill="currentColor"
                    d="M122.2,10.2h2.8l-0.5,1.4h-2.3v7.1c0,0.6,0.1,1,0.3,1.3c0.2,0.2,0.6,0.4,1.1,0.4 c0.4,0,0.8-0.1,1.1-0.2l0.2,1.1c-0.6,0.3-1.2,0.4-1.9,0.4c-1.7,0-2.5-0.8-2.5-2.5v-7.6H119v-1.4h1.4V10c0-0.2,0.1-1,0.2-2.3l0-0.3 l1.8-0.4C122.2,8.2,122.2,9.3,122.2,10.2z"
                  />
                  <path
                    fill="currentColor"
                    d="M126.8,15.7c0-1.8,0.4-3.2,1.3-4.2c0.8-1,2-1.6,3.4-1.6c1.6,0,2.9,0.6,3.8,1.9 c0.7,1,1,2.4,1,4.1c0,2-0.6,3.6-1.7,4.6c-0.8,0.7-1.8,1.1-3,1.1c-1.5,0-2.6-0.5-3.5-1.6C127.3,19,126.8,17.5,126.8,15.7z M133.9,12.8c-0.5-0.9-1.2-1.4-2.3-1.4c-1.1,0-1.8,0.4-2.3,1.2c-0.4,0.6-0.5,1.6-0.5,2.9c0,1.7,0.2,2.9,0.7,3.6 c0.5,0.7,1.2,1.1,2.2,1.1c1.2,0,2-0.6,2.4-1.7c0.2-0.6,0.3-1.4,0.3-2.4C134.4,14.6,134.2,13.5,133.9,12.8z"
                  />
                  <path
                    fill="currentColor"
                    d="M139.6,12.8c0-1-0.1-1.8-0.4-2.4l1.7-0.5c0.3,0.6,0.4,1.1,0.4,1.7v0.2 c0.9-1.2,1.9-1.8,3.1-1.8c0.2,0,0.4,0,0.6,0.1l-0.7,1.9c-0.2-0.1-0.4-0.1-0.5-0.1c-0.4,0-0.9,0.1-1.3,0.4c-0.4,0.3-0.8,0.6-1,1 c-0.1,0.3-0.2,0.7-0.2,1.2v6.9h-1.7V12.8z"
                  />
                </g>
              </svg>
            </a>
            <a
              className="mb-5 mr-3 text-gray-500 hover:text-gray-900 lg:mb-0"
              href="https://www.reddit.com/r/webdev/comments/pm4xz8/flowbite_tailwind_css_components_library_mit/"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <svg
                className="h-14"
                xmlns="http://www.w3.org/2000/svg"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="{1.4142}"
                viewBox="-39.158565 -22.4785 339.37423 134.871"
              >
                <g transform="translate(-14.043 -10.043)">
                  <circle
                    fill="currentColor"
                    r="5.687"
                    cy="40.998"
                    cx="249.773"
                  />
                  <path
                    fill="#6B7280"
                    fillRule="nonzero"
                    d="M168.549 65.247c2.79 0 4.399-2.092 4.292-4.131-.053-1.073-.161-1.771-.268-2.307-1.717-7.403-7.725-12.876-14.861-12.876-8.476 0-15.343 7.672-15.343 17.114s6.867 17.114 15.343 17.114c5.312 0 9.121-1.931 11.857-4.989 1.341-1.502 1.073-3.809-.537-4.936-1.341-.912-3.004-.59-4.238.429-1.18 1.02-3.433 3.058-7.082 3.058-4.291 0-7.939-3.702-8.744-8.584h19.581zm-10.89-12.822c3.862 0 7.189 3.004 8.423 7.135h-16.846c1.234-4.184 4.56-7.135 8.423-7.135zm-14.968-3.112c0-1.609-1.18-2.897-2.682-3.165-4.668-.697-9.067 1.019-11.588 4.185v-.43c0-1.985-1.61-3.218-3.219-3.218-1.771 0-3.219 1.448-3.219 3.218v26.288c0 1.717 1.287 3.219 3.004 3.326 1.878.107 3.434-1.341 3.434-3.219V62.725c0-6.008 4.506-10.944 10.729-10.246h.644c1.609-.108 2.897-1.503 2.897-3.166zm110.3 3.434c0-1.771-1.448-3.219-3.218-3.219-1.771 0-3.219 1.448-3.219 3.219v23.551c0 1.771 1.448 3.219 3.219 3.219 1.77 0 3.218-1.448 3.218-3.219V52.747zm-47.854-17.811c0-1.771-1.448-3.219-3.219-3.219-1.77 0-3.218 1.448-3.218 3.219V49.26c-2.2-2.2-4.936-3.273-8.209-3.273-8.476 0-15.343 7.672-15.343 17.114s6.867 17.114 15.343 17.114c3.273 0 6.063-1.127 8.262-3.327.268 1.503 1.61 2.629 3.165 2.629 1.771 0 3.219-1.448 3.219-3.219zM190.545 73.83c-4.936 0-8.906-4.774-8.906-10.729 0-5.901 3.97-10.73 8.906-10.73s8.906 4.775 8.906 10.73-4.024 10.729-8.906 10.729zm48.176-38.894c0-1.771-1.448-3.219-3.219-3.219-1.77 0-3.219 1.448-3.219 3.219V49.26c-2.199-2.2-4.935-3.273-8.208-3.273-8.476 0-15.343 7.672-15.343 17.114s6.867 17.114 15.343 17.114c3.273 0 6.062-1.127 8.262-3.327.268 1.503 1.609 2.629 3.165 2.629 1.771 0 3.219-1.448 3.219-3.219zM224.075 73.83c-4.936 0-8.905-4.774-8.905-10.729 0-5.901 3.969-10.73 8.905-10.73s8.906 4.775 8.906 10.73-3.97 10.729-8.906 10.729zm45.225 2.522V52.425h2.844c1.502 0 2.843-1.127 2.95-2.683.108-1.663-1.233-3.057-2.843-3.057H269.3v-4.507c0-1.717-1.287-3.219-3.004-3.326-1.878-.107-3.433 1.341-3.433 3.219v4.667h-2.683c-1.502 0-2.843 1.127-2.95 2.683-.108 1.663 1.234 3.058 2.843 3.058h2.736v23.927c0 1.77 1.449 3.218 3.219 3.218 1.878-.107 3.272-1.502 3.272-3.272z"
                  />
                </g>
                <g transform="translate(-14.043 -10.043)">
                  <circle
                    fill="currentColor"
                    r="44.957"
                    cy="{55}"
                    cx="{59}"
                  />
                  <path
                    fill="#fff"
                    fillRule="nonzero"
                    d="M88.989 55c0-3.648-2.95-6.545-6.545-6.545-1.77 0-3.38.697-4.56 1.824-4.506-3.219-10.676-5.311-17.543-5.579l3.004-14.056 9.764 2.092c.108 2.468 2.146 4.453 4.668 4.453 2.575 0 4.667-2.092 4.667-4.668 0-2.575-2.092-4.667-4.667-4.667-1.824 0-3.434 1.073-4.185 2.629l-10.89-2.307c-.322-.054-.644 0-.859.161-.268.161-.429.429-.482.751l-3.327 15.665c-6.974.215-13.251 2.307-17.811 5.58a6.5883 6.5883 0 00-4.56-1.824c-3.648 0-6.545 2.95-6.545 6.545 0 2.682 1.609 4.935 3.863 5.955-.108.643-.161 1.287-.161 1.985 0 10.085 11.749 18.294 26.234 18.294 14.485 0 26.234-8.155 26.234-18.294 0-.644-.054-1.342-.161-1.985 2.253-1.02 3.862-3.327 3.862-6.009zm-44.957 4.667c0-2.575 2.092-4.667 4.668-4.667 2.575 0 4.667 2.092 4.667 4.667 0 2.575-2.092 4.668-4.667 4.668-2.576.053-4.668-2.093-4.668-4.668zM70.159 72.06c-3.219 3.219-9.335 3.434-11.105 3.434-1.824 0-7.94-.269-11.106-3.434-.482-.483-.482-1.234 0-1.717.483-.482 1.234-.482 1.717 0 2.039 2.039 6.331 2.736 9.389 2.736 3.058 0 7.403-.697 9.388-2.736.483-.482 1.234-.482 1.717 0 .429.483.429 1.234 0 1.717zm-.859-7.672c-2.575 0-4.667-2.092-4.667-4.667 0-2.575 2.092-4.667 4.667-4.667 2.576 0 4.668 2.092 4.668 4.667 0 2.521-2.092 4.667-4.668 4.667z"
                  />
                </g>
              </svg>
            </a>
            <a
              className="mb-5 mr-3 text-gray-500 hover:text-gray-900 lg:mb-0"
              href="https://www.producthunt.com/posts/flowbite"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <svg
                className="h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 59.931"
              >
                <defs>
                  <clipPath id="A">
                    <path d="M0 640h1425V0H0v640z" />
                  </clipPath>
                </defs>
                <g
                  clipPath="url(#A)"
                  transform="matrix(.249714 0 0 -.249714 -49.942762 109.874083)"
                >
                  <path
                    fill="currentColor"
                    d="M440 320c0-66.274-53.726-120-120-120s-120 53.726-120 120 53.726 120 120 120 120-53.726 120-120"
                  />
                  <path
                    fill="#fff"
                    d="M336 320h-34v36h34c9.94 0 18-8.06 18-18s-8.06-18-18-18m0 60h-58V260h24v36h34c23.196 0 42 18.804 42 42s-18.804 42-42 42"
                  />
                  <path
                    fill="currentColor"
                    d="M566.068 334.668c0 6.6-5.075 10.606-11.666 10.606h-17.67v-21.092h17.67c6.6 0 11.666 4.006 11.666 10.486M520 280v80h36.753c17.086 0 26.4-11.546 26.4-25.332 0-13.666-9.42-25.212-26.4-25.212H536.73V280H520zm73.323 0v58.324h14.956v-7.66c4.125 4.95 11.08 9.07 18.15 9.07v-14.606c-1.065.235-2.36.35-4.125.35-4.95 0-11.55-2.825-14.026-6.48V280h-14.956zm83.434 29.927c0 8.836-5.2 16.496-14.6 16.496-9.315 0-14.496-7.66-14.496-16.496 0-8.956 5.18-16.6 14.496-16.6 9.42 0 14.6 7.655 14.6 16.6m-44.658 0c0 16.14 11.3 29.807 30.047 29.807 18.85 0 30.162-13.666 30.162-29.807S680.997 280 662.146 280c-18.736 0-30.047 13.786-30.047 29.927m110.556-10.13v20.146c-2.475 3.77-7.895 6.48-12.846 6.48-8.595 0-14.486-6.716-14.486-16.496 0-9.896 5.9-16.6 14.486-16.6 4.95 0 10.37 2.7 12.846 6.48m0-19.796v8.72c-4.48-5.655-10.6-8.72-17.556-8.72-14.256 0-25.212 10.84-25.212 29.927 0 18.496 10.726 29.807 25.212 29.807 6.715 0 13.076-2.826 17.556-8.716V360h15.08v-80h-15.08zm68.373-.01v8.6c-3.885-4.24-10.716-8.6-20.022-8.6-12.5 0-18.38 6.835-18.38 17.9v40.413h14.957V303.8c0-7.895 4.125-10.485 10.485-10.485 5.775 0 10.37 3.18 12.96 6.48v38.528h14.966V280h-14.966zm26.2 29.927c0 17.436 12.72 29.807 30.162 29.807 11.666 0 18.736-5.065 22.506-10.25l-9.785-9.185c-2.706 4.005-6.83 6.125-12 6.125-9.076 0-15.436-6.6-15.436-16.496s6.36-16.6 15.436-16.6c5.18 0 9.305 2.355 12 6.245l9.785-9.2c-3.77-5.186-10.84-10.37-22.506-10.37-17.44 0-30.162 12.37-30.162 29.927m65.532-14.26v29.572h-9.42v13.08h9.42v15.55h14.966v-15.55h11.54v-13.08h-11.54v-25.567c0-3.65 1.88-6.36 5.18-6.36 2.236 0 4.365.825 5.18 1.765l3.185-11.426c-2.235-2.005-6.246-3.655-12.5-3.655-10.486 0-16.02 5.42-16.02 15.67M1025.1 280v34.522h-37.117V280H971.27v80h16.722v-30.867h37.117V360h16.846v-80H1025.1zm70.398 0v8.6c-3.885-4.24-10.716-8.6-20.022-8.6-12.5 0-18.38 6.835-18.38 17.9v40.413h14.956V303.8c0-7.895 4.126-10.485 10.486-10.485 5.775 0 10.37 3.18 12.96 6.48v38.528h14.966V280h-14.966zm68.248 0v35.817c0 7.896-4.116 10.606-10.486 10.606-5.9 0-10.36-3.3-12.96-6.6V280h-14.957v58.324h14.957v-7.306c3.655 4.24 10.725 8.716 19.916 8.716 12.605 0 18.6-7.066 18.6-18.14V280h-15.08zm32.916 15.67v29.572h-9.42v13.08h9.42v15.55h14.966v-15.55h11.54v-13.08h-11.54v-25.567c0-3.65 1.88-6.36 5.18-6.36 2.236 0 4.365.825 5.2 1.765l3.176-11.426c-2.236-2.005-6.246-3.655-12.5-3.655-10.486 0-16.02 5.42-16.02 15.67"
                  />
                </g>
              </svg>
            </a>
            <a
              className="mb-5 mr-3 text-gray-500 hover:text-gray-900 lg:mb-0"
              href="https://www.youtube.com/results?search_query=flowbite"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <svg
                className="h-6"
                viewBox="0 0 492 110"
              >
                <path
                  fill="currentColor"
                  d="M154.3 17.5a19.6 19.6 0 00-13.8-13.8C128.4.4 79.7.4 79.7.4S31 .5 18.9 3.8A19.6 19.6 0 005.1 17.6C1.44 39.1.02 71.86 5.2 92.5A19.6 19.6 0 0019 106.3c12.1 3.3 60.8 3.3 60.8 3.3s48.7 0 60.8-3.3a19.6 19.6 0 0013.8-13.8c3.86-21.53 5.05-54.27-.1-75z"
                />
                <path
                  fill="#fff"
                  d="M64.2 78.4L104.6 55 64.2 31.6z"
                />
                <g fill="#6B7280">
                  <path d="M227.9 99.7c-3.1-2.1-5.3-5.3-6.6-9.7s-1.9-10.2-1.9-17.5v-9.9c0-7.3.7-13.3 2.2-17.7 1.5-4.5 3.8-7.7 7-9.7s7.3-3.1 12.4-3.1c5 0 9.1 1 12.1 3.1s5.3 5.3 6.7 9.7 2.1 10.3 2.1 17.6v9.9c0 7.3-.7 13.1-2.1 17.5s-3.6 7.6-6.7 9.7c-3.1 2-7.3 3.1-12.5 3.1-5.4.1-9.6-1-12.7-3zM245.2 89c.9-2.2 1.3-5.9 1.3-10.9V56.8c0-4.9-.4-8.5-1.3-10.7-.9-2.3-2.4-3.4-4.5-3.4s-3.5 1.1-4.4 3.4-1.3 5.8-1.3 10.7v21.3c0 5 .4 8.7 1.2 10.9s2.3 3.3 4.5 3.3c2.1 0 3.6-1.1 4.5-3.3zm219.2-16.3v3.5l.4 9.9c.3 2.2.8 3.8 1.6 4.8s2.1 1.5 3.8 1.5c2.3 0 3.9-.9 4.7-2.7.9-1.8 1.3-4.8 1.4-8.9l13.3.8c.1.6.1 1.4.1 2.4 0 6.3-1.7 11-5.2 14.1s-8.3 4.7-14.6 4.7c-7.6 0-12.9-2.4-15.9-7.1s-4.6-12.1-4.6-22V61.6c.34-17 3.33-29.45 20.9-29.5 5.3 0 9.3 1 12.1 2.9s4.8 4.9 6 9 1.7 9.7 1.7 16.9v11.7h-25.7zm2-28.8c-.8 1-1.3 2.5-1.6 4.7s-.4 10-.4 10v4.9h11.2v-4.9c0 4.9-.1-7.7-.4-10s-.8-3.9-1.6-4.8-2-1.4-3.6-1.4c-1.7.1-2.9.6-3.6 1.5zM190.5 71.4L173 8.2h15.3s7.15 31.7 9.6 46.6h.4c2.78-15.82 9.8-46.6 9.8-46.6h15.3l-17.7 63.1v30.3h-15.1V71.4z" />
                  <path
                    fill="#6B7280"
                    id="prefix__a"
                    d="M311.5 33.4v68.3h-12l-1.3-8.4h-.3c-3.3 6.3-8.2 9.5-14.7 9.5-11.77-.03-13.08-10-13.2-18.4v-51h15.4v50.1c0 3 .3 5.2 1 6.5 1.42 2.78 5.1 2.07 7.1.7a8 8 0 002.7-3.1V33.4z"
                  />
                  <path d="M353.3 20.6H338v81.1h-15V20.6h-15.3V8.2h45.5v12.4zm87.9 23.7c-.9-4.3-2.4-7.4-4.5-9.4-2.1-1.9-4.9-2.9-8.6-2.9a14.1 14.1 0 00-7.9 2.4c-2.5 1.6-4.3 3.7-5.7 6.3h-.1v-36h-14.8v96.9h12.7l1.6-6.5h.3a14 14 0 005.3 5.5c2.4 1.3 5 2 7.9 2 5.2 0 9-2.4 11.5-7.2 2.4-4.8 3.7-12.3 3.7-22.4V62.2c0-7.6-.5-13.6-1.4-17.9zm-14.1 27.9c0 5-.2 8.9-.6 11.7s-1.1 4.8-2.1 6-2.3 1.8-3.9 1.8c-3.1-.1-4.86-1.5-6.1-3.6V49.3c.5-1.9 1.4-3.4 2.7-4.6 2.2-2.47 5.96-2.5 7.7 0 .9 1.2 1.4 3.3 1.8 6.2.3 2.9.5 7 .5 12.4z" />
                </g>
                <use
                  href="#prefix__a"
                  x="78.9"
                />
              </svg>
            </a>
            <a
              className="mb-5 mr-3 text-gray-500 hover:text-gray-900 dark:hover:text-white lg:mb-0"
              href="https://dev.to/themesberg/flowbite-tailwind-css-components-library-1g5o"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <svg
                className="h-12"
                viewBox="0 32 447.99999999999994 448"
              >
                <path
                  fill="currentColor"
                  d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35s5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className="pt-20">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight">
          Frequently asked questions
        </h2>
        <p className="mb-6 text-lg font-normal text-gray-500 sm:text-xl xl:px-60">
          All types of businesses need access to development resources, so we
          give you the option to decide how much you need to use.
        </p>
        <hr className="my-6 bg-gray-200 md:my-12" />
        <div className="grid gap-8 text-left lg:grid-cols-3">
          <div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                What do you mean by &ldquo;Figma assets&ldquo;?
              </h3>
              <p className="text-gray-600">
                You will have access to download the full Figma project
                including all of the pages, the components, responsive pages,
                and also the icons, illustrations, and images included in the
                screens.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                What does &ldquo;lifetime access&ldquo; exactly mean?
              </h3>
              <p className="mb-4 text-gray-600">
                Once you have purchased either the design, code, or both
                packages, you will have access to all of the future updates
                based on the roadmap, free of charge.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                How does support work?
              </h3>
              <p className="mb-4 text-gray-600">
                We&quot;re aware of the importance of well qualified support,
                that is why we decided that support will only be provided by the
                authors that actually worked on this project.
              </p>
              <p className="mb-4 text-gray-600">
                Feel free to
                <a
                  href="#"
                  className="font-medium underline text-fuchsia-600 hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  contact us
                </a>
                and we&quot;ll help you out as soon as we can.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                I want to build more than one project with Flowbite. Is that
                allowed?
              </h3>
              <p className="mb-4 text-gray-600">
                You can use Flowbite for an unlimited amount of projects,
                whether it&quot;s a personal website, a SaaS app, or a website
                for a client. As long as you don&quot;t build a product that
                will directly compete with Flowbite either as a UI kit, theme,
                or template, it&quot;s fine.
              </p>
              <p className="mb-4 text-gray-600">
                Find out more information by
                <a
                  href="#"
                  className="font-medium underline text-fuchsia-600 hover:no-underline"
                >
                  reading the license
                </a>
                .
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                What does &ldquo;free updates&ldquo; include?
              </h3>
              <p className="mb-4 text-gray-600">
                The free updates that will be provided is based on the
                <a
                  href="#"
                  className="font-medium underline text-fuchsia-600 hover:no-underline"
                >
                  roadmap
                </a>
                that we have laid out for this project. It is also possible that
                we will provide extra updates outside of the roadmap as well.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                What does the free version include?
              </h3>
              <p className="mb-4 text-gray-600">
                The
                <a
                  href="#"
                  className="font-medium underline text-fuchsia-600 hover:no-underline"
                >
                  free version
                </a>
                of Flowbite includes a minimal style guidelines, component
                variants, and a dashboard page with the mobile version alongside
                it.
              </p>
              <p className="mb-4 text-gray-600">
                You can use this version for any purposes, because it is
                open-source under the MIT license.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                What is the difference between Flowbite and Tailwind UI?
              </h3>
              <p className="mb-4 text-gray-600">
                Although both Flowbite and Tailwind UI are built for integration
                with Tailwind CSS, the main difference is in the design, the
                pages, the extra components and UI elements that Flowbite
                includes.
              </p>
              <p className="mb-4 text-gray-600">
                Additionally, Flowbite is a project that is still in
                development, and later it will include both the application,
                marketing, and e-commerce UI interfaces.
              </p>
            </div>
          </div>
          <div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                How do I purchase a license for my entire team?
              </h3>
              <p className="mb-4 text-gray-600">
                You can purchase a license that you can share with your entire
                team here:
              </p>
              <ul className="pl-4 mb-4 list-disc">
                <li className="mb-2 text-gray-600">
                  <span className="font-medium cursor-pointer text-fuchsia-600 hover:underline">
                    Figma Files - Buy a team license for $299 USD
                  </span>
                </li>
                <li className="mb-2 text-gray-600">
                  <span className="font-medium cursor-pointer text-fuchsia-600 hover:underline">
                    Figma Files + Tailwind CSS code pre-order - Buy a team
                    license for <del>$699</del> $559 USD
                  </span>
                </li>
                <li className="mb-4 text-gray-600">
                  <span className="font-medium cursor-pointer text-fuchsia-600 hover:underline">
                    Tailwind CSS code pre-order - Buy a team license for
                    <del>$399</del> $319 USD
                  </span>
                </li>
              </ul>
              <p className="mb-4 text-gray-600">
                Please use a single account to share with your team to access
                the download files.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Can I build/sell templates or themes using Flowbite?
              </h3>
              <p className="mb-4 text-gray-600">
                It is not allowed to use Flowbite or parts of the project to
                build themes, templates, UI kits, or page builders.
              </p>
              <p className="mb-4 text-gray-600">
                Find out more information by
                <a
                  href="#"
                  className="font-medium underline text-fuchsia-600 hover:no-underline"
                >
                  reading the license
                </a>
                .
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Can I use Flowbite in open-source projects?
              </h3>
              <p className="mb-4 text-gray-600">
                Generally, it is accepted to use Flowbite in open-source
                projects, as long as it is not a UI library, a theme, a
                template, a page-builder that would be considered as an
                alternative to Flowbite itself.
              </p>
              <p className="mb-4 text-gray-600">
                With that being said, feel free to use this design kit for your
                open-source projects.
              </p>
              <p className="mb-4 text-gray-600">
                Find out more information by
                <a
                  href="#"
                  className="font-medium underline text-fuchsia-600 hover:no-underline"
                >
                  reading the license
                </a>
                .
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Can I use Flowbite for commercial purposes?
              </h3>
              <p className="mb-4 text-gray-600">
                Absolutely! You can use this design kit to build any type of
                commercial business, whether it&quot;s a SaaS, an e-commerce
                app, an application UI.
              </p>
              <p className="mb-4 text-gray-600">
                As long as it is not a design resource that you will re-sell, it
                is alright to use it for commercial purposes.
              </p>
              <p className="mb-4 text-gray-600">
                Find out more information by
                <a
                  href="#"
                  className="font-medium underline text-fuchsia-600 hover:no-underline"
                >
                  reading the license
                </a>
                .
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Can I get an invoice?
              </h3>
              <p className="mb-4 text-gray-600">
                After opening the checkout process, you will be able to add all
                of your personal or company information that you want to be
                available on the invoice. After the purchase, you will get an
                email with the invoice.
              </p>
              <p className="mb-4 text-gray-600">
                If you forgot to complete the information, or you didn&quot;t
                get the invoice by email, feel free to
                <a
                  href="#"
                  className="font-medium underline text-fuchsia-600 hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  contact us
                </a>
                and help you out with the invoice.
              </p>
            </div>
          </div>
          <div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                When will I get access to the Tailwind CSS code if I pre-ordered
                it?
              </h3>
              <p className="mb-4 text-gray-600">
                The official date that we have set out to release the code
                version of Flowbite is the
                <span className="font-medium text-gray-900">
                  25th of September, 2021
                </span>
                . We are already working on the integration and if you have a
                pre-order, you will also get frequent updates about the
                progress.
              </p>
              <p className="mb-4 text-gray-600">
                You&quot;ll be one of the first to know when it will be
                available.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                What is your refund policy?
              </h3>
              <p className="mb-4 text-gray-600">
                If you are unhappy with your purchase, just
                <a
                  href="#"
                  className="font-medium underline text-fuchsia-600 hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  contact us
                </a>
                within 30 days and we&quot;ll issue a full refund.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Is it allowed to use the design assets, such as the fonts,
                icons, and illustrations?
              </h3>
              <p className="mb-4 text-gray-600">
                What you see is what you get. Which means that all icons, fonts,
                and illustrations can be used based on the licensing that we
                researched or purchased. For example, we purchased rights to use
                the illustrations in Flowbite.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Where can I access my download files?
              </h3>
              <p className="mb-4 text-gray-600">
                After you purchased one of the plans, you will get two emails:
                one for the invoice, and another one with the download files.
              </p>
              <p className="mb-4 text-gray-600">
                Soon we will create a way that you will be able to access the
                download files from the Flowbite dashboard from this website.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                I have a company registered for VAT. Where can I add the VAT for
                the invoice?
              </h3>
              <p className="mb-4 text-gray-600">
                After initializing the checkout process from Paddle, you will be
                able to see a text &ldquo;Add VAT code&ldquo;. Click on that,
                and add the VAT code for your company. This will also remove the
                extra VAT tax from the purchase.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Why would I pre-order the Tailwind CSS code?
              </h3>
              <p className="mb-4 text-gray-600">
                If you decide to pre-order the Tailwind CSS code, which will
                arrive on the 25th of September 2021, you can get a base 20%
                price reduction and purchase it only for $119, instead of $149.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
