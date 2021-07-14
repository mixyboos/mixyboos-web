import { getSession, signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';
import { DebugService, IDebugData } from '../src/services/api/debugService';
import JsonDisplay from '../src/components/widgets/JsonDisplay';


const DebugPage = (debugData: IDebugData) => {
  const [data, setData] = React.useState<IDebugData>(debugData);
  const [session, loading] = useSession();

  React.useEffect(() => {
    console.log('debug', debugData);
  }, [debugData]);

  return (
    <>
      {session ? (
        <div className='p-5 mt-6 overflow-y-auto'>
          <div>
            <JsonDisplay>{session}</JsonDisplay>
          </div>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => signOut()}>Sign out
          </button>
        </div>
      ) : (
        <div className='p-5 mt-6 overflow-y-auto'>
          Not signed in <br />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => signIn()}>Sign in
          </button>
        </div>
      )}

      <div className='p-5 mt-6 overflow-y-auto'>
        <h1>Debug this motherfucker!!</h1>
        <pre>netCoreVersion: {data?.netCoreVersion}</pre>
        <pre>osVersion: {data?.osVersion}</pre>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session?.accessToken) {
    const debugService = new DebugService(session.accessToken as string);
    const debugData = await debugService.getDebugInfo();
    return { props: debugData };
  }
  return { props: {} };
}

export default DebugPage;
