import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React from "react";
import { Chat } from "../chat";
import { VideoPlayer } from "../players";
import { ProcessingStatus } from "../widgets";
interface IShowProps {
  title: string;
  showId: string;
}

const waitForPlaylist = (
  url: string,
  timeout = 2000,
  retries = 5
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

const exists = async (url: string): Promise<boolean> => {
  const result = await fetch(url, {
    method: "HEAD",
  });
  return result.status === 200;
};
const Show = ({ title, showId }: IShowProps) => {
  const [connection, setConnection] = React.useState<HubConnection>();
  const [messageTitle, setMessageTitle] = React.useState(
    "Waiting for stream..."
  );
  const [messageText, setMessageText] = React.useState(
    "Please start your streamulator (OBS??)!"
  );
  const [streamId, setStreamId] = React.useState("");
  const playerRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://dev.mixyboos.com:5001/hubs/live")
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);
  React.useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("LivePage", "Connected", result);

          connection.on("StreamStatusUpdate", (message) => {
            console.log("LivePage", "ReceiveMessage", message);
            setMessageText("Connected to stream");
            setMessageTitle("Waiting for playlist to become available");

            waitForPlaylist(
              `${process.env.NEXT_PUBLIC_LIVE_HOST}/hls/${message}/index.m3u8`
            )
              .then((result: boolean) => {
                setStreamId(message);
              })
              .catch(() => {});
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);
  return (
    <div>
      <span>{title}</span>
      {!streamId ? (
        <ProcessingStatus title={messageTitle} message={messageText} />
      ) : (
        <div className="flex">
          <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
            <VideoPlayer
              playerRef={playerRef}
              src={`${process.env.NEXT_PUBLIC_LIVE_HOST}/hls/${streamId}/index.m3u8`}
              autoPlay={true}
              controls={true}
              width="100%"
              height="auto"
            />
          </div>
          <div className="w-1/4 max-h-screen">
            <Chat showId={showId} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Show;
