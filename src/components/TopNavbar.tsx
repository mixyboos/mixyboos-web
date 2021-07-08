import Link from 'next/link';
import React, { useEffect } from 'react';
import useUiStore from '../services/ui/uiStore';
import { signOut, useSession } from 'next-auth/client';

const TopNavbar = () => {
  const [session, loading] = useSession();

  useEffect(() => {
    console.log('TopNavbar', 'SESSION', session);
  }, [session]);

  return (
    <nav
      className='fixed top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-3 bg-white shadow navbar-expand-lg'>
      <div className='container flex flex-wrap items-center justify-between px-4 mx-auto'>
        <div id='left-nav'>
          <div className='relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link href='/'>
              <a
                className='inline-block py-2 mr-4 text-sm font-bold leading-relaxed text-gray-700 uppercase whitespace-nowrap'>
                Mixy::Boos
              </a>
            </Link>
            <button
              className='block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none'
              type='button'
            >
              <i className='fas fa-bars' />
            </button>
          </div>
        </div>
        <div id='center-nav'>
          <ul className='flex flex-col list-none lg:flex-row lg:ml-auto'>
            {session && (
              <li className='flex items-center'>
                <Link href='/live'>
                  <a
                    className='px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-400 rounded shadow outline-none active:bg-blue-600 hover:shadow-lg focus:outline-none'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='inline-block w-3 h-3 mr-1 mb-0.5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                      />
                    </svg>
                    Go Live
                  </a>
                </Link>
              </li>
            )}
            {session && (
              <li className='flex items-center'>
                <Link href='/upload'>
                  <a
                    className='px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-400 rounded shadow outline-none active:bg-blue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0'>
                    <svg
                      className='inline-block w-3 h-3 mr-1 mb-0.5'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                      />
                    </svg>
                    Upload
                  </a>
                </Link>
              </li>
            )}{' '}
            <li className='flex items-center'>
              <Link href='/debug'>
                <a
                  className='px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-mixyboos active:bg-blue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0'>
                  <svg
                    className='inline-block w-3 h-3 mr-1 mb-0.5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                  Debug
                </a>
              </Link>
              <Link href='/discover'>
                <a
                  className='px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-mixyboos active:bg-blue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0'>
                  <svg
                    className='inline-block w-3 h-3 mr-1 mb-0.5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                  Discover
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div id='right-nav'>
          <div className='items-center flex-grow hidden bg-white lg:flex lg:bg-opacity-0 lg:shadow-none'>
            <ul className='flex flex-col list-none lg:flex-row lg:ml-auto'>
              <li className='flex items-center'>
                <a
                  className='flex items-center px-3 py-4 text-xs font-bold text-gray-700 uppercase hover:text-gray-500 lg:py-2'
                  href='https://www.facebook.com/mixyboos'
                  target='_blank'
                >
                  <i className='text-lg text-gray-400 fab fa-facebook leading-lg ' />
                  <span className='inline-block ml-2 lg:hidden'>Share</span>
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  className='flex items-center px-3 py-4 text-xs font-bold text-gray-700 uppercase hover:text-gray-500 lg:py-2'
                  href='https://twitter.com/mixyboos'
                  target='_blank'
                >
                  <i className='text-lg text-gray-400 fab fa-twitter leading-lg ' />
                  <span className='inline-block ml-2 lg:hidden'>Tweet</span>
                </a>
              </li>
              <li className='flex items-center'>
                {session ? (
                  <Link href='#'>
                    <a
                      onClick={() => signOut()}
                      className='px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none active:bg-blue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0'
                    >
                      <svg
                        className='inline-block w-3 h-3 mr-1 mb-0.5'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        />
                      </svg>
                      Logout
                    </a>
                  </Link>
                ) : (
                  <Link href='/login'>
                    <a
                      className='px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none active:bg-blue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0'>
                      <svg
                        className='inline-block w-3 h-3 mr-1 mb-0.5'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                        />
                      </svg>
                      Login
                    </a>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
