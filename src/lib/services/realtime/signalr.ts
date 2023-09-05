import { env } from "@/env.mjs";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
const createSignalRConnection = (hub: string, token: string) => {
  const newConnection = new HubConnectionBuilder()
    .withUrl(`${env.NEXT_PUBLIC_REALTIME_HOST}/${hub}`, {
      accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.Warning)
    .withAutomaticReconnect()
    .build();
  return newConnection;
};

export { createSignalRConnection };
