import { MixModel } from '@lib/data/models';
import React from 'react';
import { Loading } from '../widgets';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useSession } from 'next-auth/react';
import { getHubConnection } from '@lib/services/api/rt/hubConnectionBuilder';

interface IMixProcessingStatusProps {
  mix: MixModel;
  title?: string;
  onProcessingFinished: () => void;
}
const MixProcessingStatus = ({
  mix,
  title = '',
  onProcessingFinished,
}: IMixProcessingStatusProps) => {
  const [connection, setConnection] = React.useState<HubConnection>();
  const [message, setMessage] = React.useState<string>(title);
  const { data: session, status } = useSession();
  React.useEffect(() => {
    if (session && session.user && session?.user.accessToken) {
      setConnection(getHubConnection(session?.user.accessToken, 'updates'));
    }
  }, [session]);

  React.useEffect(() => {
    if (!session) return;
    if (connection) {
      connection.start().then(() => {
        console.log('Debug', 'Connected to debug hub');
        connection.on('ConversionProgress', (action: any, payload: any) => {
          console.log('page', 'ConversionProgress', action, payload);
          setMessage(`${payload}%`);
        });
        connection.on('ConversionFinished', (action: any, payload: any) => {
          console.log('page', 'ConversionFinished', action, payload);
          onProcessingFinished();
        });
      });
    }
  }, [connection]);
  return (
    <div className="p-1">
      <Loading message={message} />
    </div>
  );
};

export default MixProcessingStatus;
