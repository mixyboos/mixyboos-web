import { createTRPCRouter } from "@/server/api/trpc";
import { mixRouter } from "@/server/api/routers/mix";
import { authRouter } from "@/server/api/routers/auth";

export const appRouter = createTRPCRouter({
  mix: mixRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
