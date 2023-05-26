"use client";
import React from "react";
import ShowStatus from "../../models/ShowStatus";
import CreateShow from "./CreateShow";
import Show from "./Show";
import StreamConnector from "./StreamConnector";
import { api } from "@/lib/utils/api";
import { useSession } from "next-auth/react";
import Loading from "../widgets/Loading";
import type { LiveShowModel } from "@/lib/models";

type LiveShowWrapperProps = {
  incomingShow: LiveShowModel | undefined | null;
};

const LiveShowWrapper = ({ incomingShow }: LiveShowWrapperProps) => {
  const { data: session } = useSession();
  const startShowApi = api.show.startShow.useMutation();
  const [show, setShow] = React.useState(incomingShow);
  const [showStatus, setShowStatus] = React.useState<ShowStatus>(
    ShowStatus.checking
  );

  React.useEffect(() => {
    if (showStatus === ShowStatus.ending || showStatus === ShowStatus.error) {
      return;
    }
    if (show?.id) {
      setShowStatus(ShowStatus.inProgress);
    } else {
      setShowStatus(ShowStatus.setup);
    }
  }, [show, showStatus]);

  const startShow = async (
    title: string,
    description: string,
    tags: string[]
  ) => {
    if (title && description) {
      try {
        const result = await startShowApi.mutateAsync({
          title,
          description,
          tags,
        });

        if (result) {
          setShowStatus(ShowStatus.awaitingStreamConnection);
        }
      } catch (err) {
        alert(err as string);
      }
    } else {
      alert("Please enter a title and description for your live show");
    }
  };

  if (showStatus === ShowStatus.checking)
    return <Loading message={"Checking stream status"} />;
  if (showStatus === ShowStatus.setup)
    return <CreateShow startShow={startShow} />;
  if (show && showStatus === ShowStatus.awaitingStreamConnection) {
    return (
      <StreamConnector
        inProgressShow={show}
        updateStreamStatus={(
          incomingShow: LiveShowModel | undefined,
          status: ShowStatus
        ) => {
          setShowStatus(status);
          if (incomingShow) {
            setShow(incomingShow);
          }
        }}
      />
    );
  }
  if (show?.id && showStatus === ShowStatus.inProgress)
    return (
      <Show
        title={show.title || "Unknown show"}
        show={show}
        showStatus={showStatus}
        setShowStatus={setShowStatus}
      />
    );

  return (
    <div
      className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      <span className="font-medium">Info alert!</span> Unknown show status:{" "}
      {showStatus}.
    </div>
  );
};

export default LiveShowWrapper;
