import React from 'react';
import { MixList } from '@lib/components/mix';
import { MixModel } from '@lib/data/models';
import MixService from '@lib/services/api/mixService';
import { useSession } from 'next-auth/react';

const MixListPage = () => {
  const { data: session, status } = useSession();
  const [mixes, setMixes] = React.useState<MixModel[]>([]);

  React.useEffect(() => {
    const getMixes = async () => {
      const mixes = await new MixService().getMixes();
      setMixes(mixes);
    };
    if (status === 'authenticated') {
      getMixes();
    }
  }, [session, status]);
  return (
    <div className="flex flex-col mx-4 my-6 shadow-xl rounded-2xl shadow-gray-200">
      <MixList mixes={mixes} />
    </div>
  );
};

export default MixListPage;
