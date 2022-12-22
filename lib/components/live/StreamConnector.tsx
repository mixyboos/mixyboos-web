import { useSession } from 'next-auth/react';
import React from 'react';
import LiveService from '../../services/api/liveService';

interface IStreamConnectorProps {
  showId: string;
  setStreamId: (streamId: string) => void;
}

const exists = async (url: string): Promise<boolean> => {
  const result = await fetch(url, {
    method: 'HEAD'
  });
  return result.status === 200;
};

//Interstitial page between either
//    1. Creating a live show
//    2. Refreshing the page for an existing live show
//ping the API and get the stream id for the live show
const StreamConnector = ({ showId, setStreamId }: IStreamConnectorProps) => {
  const [session, loading] = useSession();
  const [messageTitle, setMessageTitle] = React.useState(
    'Waiting for stream...'
  );
  const [messageText, setMessageText] = React.useState(
    'Please start your streamulator (OBS??)!'
  );
  // const [streamId, setStreamId] = React.useState('')

  const waitForPlaylist = (
    url: string,
    timeout = 2000,
    retries = 20
  ): Promise<boolean> =>
    new Promise<boolean>((resolve) => {
      let retryCount = 0;
      const timer = setInterval(async () => {
        const result = await exists(url);
        if (result || retryCount === retries) {
          clearInterval(timer);
          resolve(result);
        }
        retryCount++;
      }, timeout);
    });
  const getStreamIdFromShowId = React.useCallback(async () => {
    const show = await new LiveService(session.accessToken).getCurrentShow();
    alert(show);
  }, []);

  // if (show){
  //   const playlistId = show.
  // }
  // const __getPlaylistIdFromShowId = async () => {
  // const streamId = waitForPlaylist(
  //   `${process.env.NEXT_PUBLIC_LIVE_HOST}/hls/${streamId}/index.m3u8`
  // )
  //   .then((result: boolean) => {
  //     setStreamId(streamId)
  //   })
  //   .catch(() => {})
  React.useEffect(() => {
    if (!loading) {
      getStreamIdFromShowId();
    }
  }, [loading, getStreamIdFromShowId]);

  return <div></div>;
};
export default StreamConnector;
