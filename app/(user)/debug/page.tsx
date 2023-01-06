'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const DebugPage = () => {
  const { data: session, status } = useSession();
  const [connection, setConnection] = React.useState<HubConnection>();

  React.useEffect(() => {
    if (session && session.user && session?.user.accessToken) {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_RT_HOST}/debug`, {
          accessTokenFactory: () => session?.user.accessToken,
        })
        .withAutomaticReconnect()
        .build();
      setConnection(newConnection);
    }
  }, [session]);

  React.useEffect(() => {
    if (!session) return;
    if (connection) {
      connection.start().then(() => {
        console.log('Debug', 'Connected to debug hub');
        connection.on('Debuggles', (action: any, payload: any) => {
          console.log('page', 'Debuggles', action, payload);
        });
      });
    }
  }, [connection]);

  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={async () => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/debug/sendhub`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
              },
            }
          );
          console.log('page', 'sendhub', response);
        }}
      >
        Send SignalR message
      </button>
    </div>
  );
};

export default DebugPage;
