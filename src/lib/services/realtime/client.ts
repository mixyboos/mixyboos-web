import Pusher from "pusher-js";

const createPusherClient = () =>
  new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
    cluster: "eu",
  });

export default createPusherClient;
