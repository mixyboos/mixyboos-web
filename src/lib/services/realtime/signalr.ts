import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { env } from "@/env";

const createSignalRConnection = (hub: string) => {
  const newConnection = new HubConnectionBuilder()
    .withUrl(`${env.NEXT_PUBLIC_REALTIME_HOST}/${hub}`, {
      // accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.Debug)
    .withAutomaticReconnect()
    .build();
  return newConnection;
};

export default createSignalRConnection;
