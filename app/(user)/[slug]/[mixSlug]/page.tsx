import React from 'react';
import { notFound } from 'next/navigation';
import { MainPlayer } from '@lib/components/audio/players';
import { IUserMixPageParams } from './params';
import { fetchMix } from './data';
import { ContentContainer } from '@lib/components/layout';
import { humanizeDate } from '@lib/services/utils/timeUtils';
import { CommentsComponent } from '@lib/components/comments';
import { FollowButton } from '@lib/components/widgets';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';

const UserMixPage = async ({ params }: IUserMixPageParams) => {
  const mix = await fetchMix(params.slug, params.mixSlug);
  const session = await unstable_getServerSession(authOptions);

  if (!mix) notFound();
  return (
    <ContentContainer>
      <header className="flex flex-col overflow-hidden">
        <div className="flex items-center gap-6">
          <div className="flex flex-col w-full">
            <div className="w-full p-4 shadow-xl shadow-gray-200 dark:shadow-gray-900 rounded-2xl">
              <div className="flex items-center">
                <div className="flex-shrink-0 ml-3">
                  <div className="justify-center space-y-4 align-middle flex-flex-col">
                    <div className="text-2xl font-bold leading-none text-gray-800 dark:text-gray-200 sm:text-3xl">
                      {mix.title}
                    </div>
                    <div className="mb-4 text-xl font-bold leading-none text-gray-700 dark:text-gray-100 sm:text-1xl">
                      by {mix.user?.displayName}
                      <FollowButton
                        fromUser={session?.user.profile}
                        toUser={mix.user}
                      />
                    </div>
                    <h3 className="text-base font-normal text-gray-500">
                      {humanizeDate(mix.dateUploaded)}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-end flex-1 w-0 ml-5 text-base font-bold text-green-500">
                  +16%
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <hr className="my-6 border-gray-200" />
      <div className="mt-2 ">
        <MainPlayer mix={mix} />
      </div>
      <div>
        <div className="mt-2 prose prose-slate ">{mix.description}</div>
      </div>
      <div>
        <div className="mt-2 prose prose-slate ">{mix.description}</div>
      </div>
      <div>
        <div className="mt-2 ">
          <CommentsComponent mix={mix} />
        </div>
      </div>
    </ContentContainer>
  );
};

export default UserMixPage;
