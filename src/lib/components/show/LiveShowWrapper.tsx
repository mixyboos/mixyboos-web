"use client";

import type { LiveShowModel } from "@/lib/models";
import { api } from "@/lib/utils/api";
import React from "react";
import ShowStatus from "../../models/show-status";
import Loading from "../widgets/Loading";
import CreateShow from "./CreateShow";
import Show from "./Show";
import StreamConnector from "./StreamConnector";

type LiveShowWrapperProps = {
  incomingShow: LiveShowModel | undefined | null;
};

const LiveShowWrapper = ({ incomingShow }: LiveShowWrapperProps) => {
  const startShowApi = api.show.startShow.useMutation();
  const [show, setShow] = React.useState(incomingShow);

  React.useEffect(() => {
    console.log("LiveShowWrapper", "ShowStatus", show?.status);
  }, [show?.status]);

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

        if (result && show) {
          setShow(result);
        }
      } catch (err) {
        alert(err as string);
      }
    } else {
      alert("Please enter a title and description for your live show");
    }
  };

  if (show?.status === ShowStatus.setup) {
    return <CreateShow startShow={startShow} />;
  }

  if (show?.status === ShowStatus.checking) {
    return <Loading message={"Checking stream status"} />;
  }

  if (show && show?.status === ShowStatus.awaitingStreamConnection) {
    return <StreamConnector show={show} setShow={setShow} />;
  }
  if (show?.id && show?.status === ShowStatus.inProgress)
    return (
      <Show
        title={show.title || "Unknown show"}
        show={show}
        setShow={setShow}
      />
    );

  return (
    <div
      className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      <span className="font-medium">Info alert!</span> Unknown show status:{" "}
      {show?.status}.
    </div>
  );
};

export default LiveShowWrapper;
