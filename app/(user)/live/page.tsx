'use client';
import React from 'react';
import LiveService from '@lib/services/api/liveService';
import ShowStatus from '@lib/components/live/status';
import CreateShow from '@lib/components/live/CreateShow';
import StreamConnector from '@lib/components/live/StreamConnector';
import Show from '@lib/components/live/Show';
import { useSession } from 'next-auth/react';
import { Loading } from '@lib/components/widgets';
import { ShowModel } from '@lib/data/models';

const LivePage = () => {
  const { data: session, status: sessionStatus } = useSession();

  const [showId, setShowId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [showStatus, setShowStatus] = React.useState<ShowStatus>(
    ShowStatus.checking
  );

  React.useEffect(() => {
    const checkForCurrentShow = async () => {
      const service = new LiveService();
      const inProgressShow = await service.getCurrentShow();
      if (inProgressShow) {
        if (inProgressShow?.id) {
          setShowId(inProgressShow.id);
          setTitle(inProgressShow.title);
          setShowStatus(ShowStatus.inProgress);
        }
      } else {
        setShowStatus(ShowStatus.setup);
      }
    };
    if (
      session &&
      (showStatus === ShowStatus.setup || showStatus === ShowStatus.checking)
    ) {
      checkForCurrentShow();
    }
  }, [session, showStatus]);

  const startShow = async (show: ShowModel) => {
    const service = new LiveService();
    if (show && show.title) {
      await service.startShow(show);
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
      case ShowStatus.inProgress:
      case ShowStatus.ending:
        return (
          <Show
            title={title}
            showId={showId}
            showStatus={showStatus}
            setShowStatus={setShowStatus}
          />
        );
    }
  };
  return (
    <div className="p-5 mt-6 overflow-y-auto">
      {showStatus !== ShowStatus.checking &&
        showStatus !== ShowStatus.setup && (
          <StreamConnector
            inProgressShowId={showId}
            updateStreamStatus={(showId: string, status: ShowStatus) => {
              setShowId(showId);
              setShowStatus(status);
            }}
          />
        )}
      {sessionStatus === 'loading' ? <Loading /> : _getPage(showStatus)}
    </div>
  );
};

export default LivePage;
