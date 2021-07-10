import { signIn, signOut, useSession } from 'next-auth/client';
import React, { useState } from 'react';
import { debugService } from '../src/services/api/debugService';
import { cancelIdleCallback } from 'next/dist/client/request-idle-callback';
import JsonDisplay from '../src/components/widgets/JsonDisplay';

interface IDebugData {
  netCoreVersion: string
  osVersion: string
}

const DebugPage = () => {
    const [data, setData] = useState<IDebugData>();
    const [session, loading] = useSession();

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
  }
;

export default DebugPage;
