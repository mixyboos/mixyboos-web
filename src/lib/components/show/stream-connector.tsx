import React from "react";
import { ShowStatus, type LiveShowModel } from "@/lib/models";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HubConnectionState, type HubConnection } from "@microsoft/signalr";

import Loading from "@/components/widgets/loading";
import { useSession } from "next-auth/react";
import logger from "@/lib/logger";
import  createSignalRConnection from "@/lib/services/realtime/signalr";

type StreamConnectorProps = {
  show: LiveShowModel;
  setShow: (show: LiveShowModel) => void;
};

const StreamConnector = ({ show, setShow }: StreamConnectorProps) => {
  const { data: session, status } = useSession();
  const [messageTitle, setMessageTitle] = React.useState(
    "Please start streaming...",
  );
  const [messageText, setMessageText] = React.useState(
    "If your show doesn't start, refresh this page and restart your stream",
  );
  const [connection, setConnection] = React.useState<HubConnection>();
  React.useEffect(() => {
    if (
      session &&
      status === "authenticated" &&
      (!connection || connection.state === HubConnectionState.Disconnected)
    ) {
      const newConnection = createSignalRConnection(
        "live",
        session?.user.accessToken,
      );
      setConnection(newConnection);
    }
    return () => {
      connection?.stop();
    };
  }, [session, status]);
  React.useEffect(() => {
    if (connection && connection.state === HubConnectionState.Disconnected) {
      console.log("StreamConnector", "Setting connection listeners");
      connection
        .start()
        .then(() => {
          console.log("LivePage", "Connected");

          connection.on("StreamStarted", (message) => {
            setMessageTitle("Waiting for audio");
            setMessageText(
              "RTMP stream detected, waiting for broadcast to be ready",
            );
          });

          connection.on("StreamReady", (message) => {
            if (message) {
              try {
                const s = message as LiveShowModel;
                setShow(s);
              } catch (err) {
                logger.error(
                  "StreamConnector",
                  "Error parsing message",
                  err,
                  message,
                );
              }
            } else {
              show.status = ShowStatus.error;
              setShow(show);
            }
          });
          connection.on("StreamEnded", (message) => {
            const s = message as LiveShowModel;
            setShow(s);
            connection
              ?.stop()
              .then((r) =>
                console.log("StreamConnector", "connection stopped", r),
              );
          });
        })
        .catch((e) => {
          logger.error("stream-connector", "Connection failed", e);
        });

      return () => {
        connection?.stop();
      };
    }
  }, [connection, setShow, show]);

  if (!show?.id) return null;

  return (
    <Card className="mx-auto mt-12 max-w-xl">
      <CardHeader>
        <CardTitle>Waiting for stream.</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Loading title={messageTitle} message={messageText} />
      </CardContent>
    </Card>
  );
};

export default StreamConnector;
