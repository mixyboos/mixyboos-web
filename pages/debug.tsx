import { getSession, signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';
import { DebugService, IDebugData } from '../src/services/api/debugService';
import JsonDisplay from '../src/components/widgets/JsonDisplay';


const DebugPage = () => {
    const [session, loading] = useSession();
    const [debugData, setDebugData] = React.useState<IDebugData>(null);

    React.useEffect(() => {
      if (session) {
        console.log('debug', session);
        const debugService = new DebugService(session.accessToken as string);
        debugService.getDebugInfo()
          .then(d => setDebugData(d));
      }
    }, [session]);

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
          <pre>netCoreVersion: {debugData?.netCoreVersion ?? '???'}</pre>
          <pre>osVersion: {debugData?.osVersion ?? '???'}</pre>
        </div>
      </>
    );
  }
;
export default DebugPage;
