"use client";

import React from "react";
import Loading from "@/components/widgets/loading";
import CreateShow from "./create";
import Show from "./show";
import StreamConnector from "./stream-connector";
import LiveService from "@/lib/services/api/live-service";
import { ShowStatus, type LiveShowModel } from "@/lib/models";

type LiveShowWrapperProps = {
  incomingShow: LiveShowModel | undefined | null;
};

const LiveShowWrapper = ({ incomingShow }: LiveShowWrapperProps) => {
  const [show, setShow] = React.useState(incomingShow);

  React.useEffect(() => {
    console.log("LiveShowWrapper", "ShowStatus", show?.status);
  }, [show?.status]);

  const startShow = async (
    title: string,
    description: string,
    tags: string[],
  ) => {
    if (title && description) {
      try {
        const service = new LiveService();
        const newShow = await service.startShow(title, description, tags);
        if (newShow) {
          setShow(newShow);
        }
      } catch (err) {
        alert(err as string);
      }
    } else {
      alert("Please enter a title and description for your live show");
    }
  };
  const _renderShow = (showToRender: LiveShowModel) => {
    switch (showToRender.status) {
      case ShowStatus.awaitingStreamConnection:
        return (
          <div>
            <h2>Stream Connector</h2>
            <div>{JSON.stringify(show, null, 2)}</div>
            <StreamConnector show={showToRender} setShow={setShow} />
          </div>
        );

      case ShowStatus.setup:
        return <div>Setup????????</div>;

      case ShowStatus.awaitingStreamConnection:
        return <StreamConnector show={showToRender} setShow={setShow} />;

      case ShowStatus.checking:
        return <Loading message={"Checking stream status"} />;

      case ShowStatus.inProgress:
        return (
          <Show
            title={showToRender.title || "Unknown show"}
            show={showToRender}
            setShow={setShow}
          />
        );

      default:
        return (
          <div>{`Unknown stream status: ${JSON.stringify(
            showToRender,
            null,
            "\t",
          )}`}</div>
        );
    }
  };

  return show ? _renderShow(show) : <CreateShow startShow={startShow} />;
};

export default LiveShowWrapper;
