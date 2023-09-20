import { env } from "@/env.mjs";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import logger from "@/lib/logger";

const createSignalRConnection = (hub: string, token: string) => {
  const newConnection = new HubConnectionBuilder()
    .withUrl(`${env.NEXT_PUBLIC_REALTIME_HOST}/${hub}`, {
      accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.Debug)
    .withAutomaticReconnect()
    .build();
  return newConnection;
};

export default createSignalRConnection;
