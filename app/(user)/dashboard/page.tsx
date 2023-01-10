import { Sidebar } from '@lib/components/layout';
import { DashboardPageControl } from '@lib/components/pages';
import React from 'react';
import MixService from '@lib/services/api/mixService';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '@pages/api/auth/[...nextauth]';
const fetchMixesForDashboard = async () => {
  const session = await unstable_getServerSession(authOptions);
  if (!session) return undefined;
  const mixService = new MixService(session.user.accessToken);
  return mixService.getMixesFeed();
};

const DashboardPage = async () => {
  const mixes = await fetchMixesForDashboard();
  return (
    <div className="flex p-5 mt-6 overflow-y-auto">
      <div className="flex-none w-72">
        <Sidebar />
      </div>
      <div className="flex-grow mx-6">
        <DashboardPageControl mixes={mixes} />
      </div>
    </div>
  );
};

export default DashboardPage;
