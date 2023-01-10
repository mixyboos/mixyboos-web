import { HubConnectionBuilder } from '@microsoft/signalr';

export const getHubConnection = (accessToken: string, hub: string) => {
  const newConnection = new HubConnectionBuilder()
    .withUrl(`${process.env.NEXT_PUBLIC_RT_HOST}/${hub}`, {
      accessTokenFactory: () => accessToken,
    })
    .withAutomaticReconnect()
    .build();
  return newConnection;
};
