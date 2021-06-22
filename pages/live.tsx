import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CreateShow, Show } from "../src/components/live";
import liveService from "../src/services/api/liveService";

enum ShowStatus {
  checking,
  setup,
  inProgress,
  ending,
}
export const LivePage = () => {
  const [showId, setShowId] = React.useState(uuidv4());
  const [title, setTitle] = React.useState("");
  const [showStatus, setShowStatus] = React.useState<ShowStatus>(
    ShowStatus.checking
  );

  React.useEffect(() => {
    //check if show is in progress
    const checkForCurrentShow = async () => {
      const inProgressShowId = await liveService.getShowInProgress();
      if (inProgressShowId) {
        setShowId(inProgressShowId);
        setShowStatus(ShowStatus.inProgress);
      } else {
        setShowStatus(ShowStatus.setup);
      }
    };
    if (showStatus === ShowStatus.checking) {
      checkForCurrentShow();
    }
  }, []);

  const startShow = async (title: string) => {
    if (title) {
      await liveService.startShow(title);
      setTitle(title);
      setShowStatus(ShowStatus.inProgress);
    } else {
      //TODO
      alert("Please enter a title for your live show");
    }
  };
  const _getPage = (status: ShowStatus) => {
    switch (status) {
      case ShowStatus.setup:
        return <CreateShow startShow={startShow} />;
      case ShowStatus.inProgress:
        return <Show title={title} showId={showId} />;
      default:
        return <div>Checking......</div>;
    }
  };
  return <div className="p-5 mt-6 overflow-y-auto">{_getPage(showStatus)}</div>;
};
export default LivePage;
