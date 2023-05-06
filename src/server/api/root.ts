import { createTRPCRouter } from "@/server/api/trpc";
import { mixRouter } from "@/server/api/routers/mix";

export const appRouter = createTRPCRouter({
  mix: mixRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
