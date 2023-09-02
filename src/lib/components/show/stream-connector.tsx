import React from "react";
import type { LiveShowModel } from "@/lib/models";
import { createPusherClient } from "@/lib/services/realtime";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/widgets/loading";

type StreamConnectorProps = {
  show?: LiveShowModel;
  setShow: (show: LiveShowModel) => void;
};

const StreamConnector = ({ show, setShow }: StreamConnectorProps) => {
  const [messageTitle, setMessageTitle] = React.useState(
    "Please start streaming...",
  );
  const [messageText, setMessageText] = React.useState(
    "If your show doesn't start, refresh this page and restart your stream",
  );

  React.useEffect(() => {
    if (!show?.id) return;

    console.log("page", "pusher", process.env.NEXT_PUBLIC_PUSHER_KEY);
    const pusher = createPusherClient();

    const showChannel = `ls_${show?.id}`;
    const channel = pusher.subscribe(showChannel);

    channel.bind("show-started", (data: LiveShowModel) => {
      console.log("StreamConnector", "show-started", data);
      setShow(data);
    });

    return () => {
      pusher.unsubscribe(showChannel);
    };
  }, [show, setShow]);

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
