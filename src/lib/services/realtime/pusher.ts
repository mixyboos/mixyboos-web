import { env } from "@/env.mjs";
import Pusher from "pusher";

const push = new Pusher({
  appId: env.PUSHER_APPID,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

export default push;
