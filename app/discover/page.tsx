import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import React from 'react';
import MixService from '@lib/services/api/mixService';
import { MixList } from '@lib/components/mix';
import { MixModel } from '@lib/data/models';

const DiscoverPage = async () => {
  const session = await unstable_getServerSession(authOptions);
  console.log('DiscoverPage', 'session', session);
  let mixes: MixModel[] = [];
  const mixService = new MixService(session?.user.accessToken);
  mixes = await mixService.getMixes();
  return (
    <div>
      <MixList mixes={mixes} />
    </div>
  );
};

export default DiscoverPage;
