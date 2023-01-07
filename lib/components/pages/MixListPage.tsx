import React from 'react';
import { MixList } from '@lib/components/mix';
import { MixModel } from '@lib/data/models';
import MixService from '@lib/services/api/mixService';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MdOutlineCloudUpload } from 'react-icons/md';

const MixListPage = () => {
  const { data: session, status } = useSession();
  const [mixes, setMixes] = React.useState<MixModel[]>([]);
const [didMixLookup, setDidMixLookup]= React.useState(false);
  React.useEffect(() => {
    const getMixes = async () => {
      const mixes = await new MixService().getMixesFeed();
      setMixes(mixes);
      setDidMixLookup(true);
    };
    if (status === 'authenticated' && session.user) {
      getMixes();
    }
  }, [session, status]);
  return didMixLookup && mixes.length === 0 ? (
    <div className="grid w-full place-items-center">
      <div className="max-w-sm p-6 my-20 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Not much to show here?
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Why don&quot;t you start following some people? Or even better, upload
          your own music?
        </p>
        <Link
          href="/mix/create"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Upload a mix?
          <MdOutlineCloudUpload
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
          />
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex flex-col mx-4 my-6 shadow-xl rounded-2xl shadow-gray-200">
      <MixList mixes={mixes} />
    </div>
  );
};

export default MixListPage;
