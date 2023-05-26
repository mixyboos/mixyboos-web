import { env } from "@/env.mjs";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const settingsRouter = createTRPCRouter({
  getStreamHost: protectedProcedure.query(() => {
    return env.STREAM_HOST;
  }),
});
