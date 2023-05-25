"use client";
import type { LiveShow } from "@prisma/client";
import React from "react";
import ShowStatus from "./status";
import CreateShow from "./CreateShow";
import Show from "./Show";
import StreamConnector from "./StreamConnector";
import { api } from "@/lib/utils/api";
import { notice } from "../notifications/toast";
import { useSession } from "next-auth/react";
import Loading from "../widgets/Loading";
import type LiveShowDTO from "@/lib/models/LiveShowDTO";

type LiveShowWrapperProps = {
  incomingShow: LiveShowDTO | undefined | null;
};

const LiveShowWrapper = ({ incomingShow }: LiveShowWrapperProps) => {
  const { data: session } = useSession();
  const startShowApi = api.show.startShow.useMutation();
  const [show, setShow] = React.useState(incomingShow);
  const [showStatus, setShowStatus] = React.useState<ShowStatus>(
    ShowStatus.initial
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
  const _getPage = (status: ShowStatus) => {
    console.log("LiveShowWrapper", "_getPage", showStatus);
    switch (status) {
      case ShowStatus.setup:
        return <CreateShow startShow={startShow} />;
      case ShowStatus.awaitingStreamConnection:
        return;
      case ShowStatus.inProgress:
      case ShowStatus.ending:
        return show?.id ? (
          <Show
            title={show.title || "Unknown show"}
            show={show}
            showStatus={showStatus}
            setShowStatus={setShowStatus}
          />
        ) : (
          <h1>This would be a problem</h1>
        );
      default:
        return (
          <div
            className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span className="font-medium">Info alert!</span> Unknown show
            status: {showStatus}.
          </div>
        );
    }
  };
  return (
    <>
      {show &&
        showStatus !== ShowStatus.checking &&
        showStatus !== ShowStatus.setup && (
          <StreamConnector
            inProgressShow={show}
            updateStreamStatus={(
              incomingShow: LiveShowDTO | undefined,
              status: ShowStatus
            ) => {
              setShowStatus(status);
              if (incomingShow) {
                setShow(incomingShow);
              }
            }}
          />
        )}
      {session ? _getPage(showStatus) : <Loading />}
    </>
  );
};

export default LiveShowWrapper;
