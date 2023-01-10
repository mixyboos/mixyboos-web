import React from 'react';
import { FollowButton, Loading } from '@lib/components/widgets';
import { UserModel } from '@lib/data/models';
import ProfileService from '@lib/services/api/profileService';
import { notFound } from 'next/navigation';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';

interface IUserProfilePageParams {
  params: {
    slug: string;
  };
}

async function fetchUser(slug: string): Promise<UserModel | undefined> {
  const session = await unstable_getServerSession(authOptions);
  if (!session) return undefined;

  const profileService = new ProfileService(session.user.accessToken);
  return profileService.getProfileBySlug(slug);
}

const UserProfilePage = async ({ params }: IUserProfilePageParams) => {
  const profile = await fetchUser(params.slug);
  if (!profile) notFound();

  return profile ? (
    <div className="profile-page">
      <section className="relative block h-[31rem]">
        <div
          className="absolute w-full h-full bg-center bg-cover top-20"
          style={{
            backgroundImage: `url('${profile.headerImage}')`,
          }}
        >
          <span
            id="blackOverlay"
            className="absolute w-full h-full bg-black opacity-50"
          />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none h-70-px"
          style={{ transform: 'translateZ(0px)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-current text-blueGray-200"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
      </section>
      <section className="relative py-8 bg-slate-200">
        <div className="container px-4 mx-auto">
          <div className="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words rounded-lg shadow-xl">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                  <div className="relative">
                    <img
                      alt="..."
                      src={profile.profileImage}
                      className="absolute h-auto -m-16 -ml-20 align-middle border-none rounded-full shadow-xl lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right lg:self-center">
                  <div className="px-3 py-6 mt-32 sm:mt-0">
                    <FollowButton />
                    <button
                      className="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none sm:mr-2"
                      type="button"
                    >
                      Message
                    </button>
                  </div>
                </div>
                <div className="w-full px-4 lg:w-4/12 lg:order-1">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="p-3 mr-4 text-center">
                      <span className="block text-xl font-bold tracking-wide uppercase text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">Mixes</span>
                    </div>
                    <div className="p-3 mr-4 text-center">
                      <span className="block text-xl font-bold tracking-wide uppercase text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Shows</span>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <span className="block text-xl font-bold tracking-wide uppercase text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Followers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 text-center">
                <h3 className="mb-2 text-4xl font-semibold leading-normal text-blueGray-700">
                  {profile.displayName}
                </h3>
                <div className="mt-0 mb-2 text-sm font-bold leading-normal uppercase text-blueGray-400">
                  <i className="mr-2 text-lg fas fa-map-marker-alt text-blueGray-400" />
                  {profile.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <Loading />
  );
};

export default UserProfilePage;
