import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreateShow, Show, ShowStatus } from '../src/components/live';
import { getSession, useSession } from 'next-auth/client';
import LiveService from '../src/services/api/liveService';

export const LivePage = () => {

  //TODO: this should be a type, not separate vars
  const service = React.useRef<LiveService>(null);
  const [session, loading] = useSession();

  const [showId, setShowId] = React.useState(uuidv4());
  const [title, setTitle] = React.useState('');
  const [showStatus, setShowStatus] = React.useState<ShowStatus>(
    ShowStatus.setup
  );

  React.useEffect(() => {
    service.current = new LiveService(session.accessToken as string);
  }, [session]);

  React.useEffect(() => {
    //check if show is in progress
    const checkForCurrentShow = async () => {
      debugger;
      const inProgressShowId = await service.current.getCurrentShow();
      if (inProgressShowId) {
        setShowId(inProgressShowId.id);
        setTitle(inProgressShowId.title);
        setShowStatus(ShowStatus.inProgress);
      } else {
        setShowStatus(ShowStatus.setup);
      }
    };
    if (showStatus === ShowStatus.checking && session) {
      checkForCurrentShow();
    }
  }, [service.current]);

  const startShow = async (title: string) => {
    if (title) {
      await service.current.startShow(title);
      setTitle(title);
      setShowStatus(ShowStatus.awaitingStreamConnection);
    } else {
      //TODO
      alert('Please enter a title for your live show');
    }
  };
  const _getPage = (status: ShowStatus) => {
    switch (status) {
      case ShowStatus.setup:
        return <CreateShow startShow={startShow} />;
      case ShowStatus.awaitingStreamConnection:
        return (
          <Show
            title={title}
            showId={showId}
            showStatus={showStatus}
            setShowStatus={setShowStatus}
          />
        );
      case ShowStatus.inProgress:
        return (
          <Show
            title={title}
            showId={showId}
            showStatus={showStatus}
            setShowStatus={setShowStatus}
          />
        );
      default:
        return <div>Checking......</div>;
    }
  };
  return <div className='p-5 mt-6 overflow-y-auto'>{_getPage(showStatus)}</div>;
};

export async function getServerSideProps(ctx) {
  try {
    const session = await getSession(ctx);
    if (session?.accessToken) {
      return {
        props: {
          session
        }
      };
    }
    throw new Error('unauthorized');

  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: `/login?redirectUri=${process.env.NEXTAUTH_URL}/live`
      }
    };
  }
}

export default LivePage;
