import { createTRPCRouter } from "@/server/api/trpc";
import { mixRouter } from "@/server/api/routers/mix";
import { authRouter } from "@/server/api/routers/auth";
import { userRouter } from "@/server/api/routers/user";
import { showRouter } from "./routers/show";
import { settingsRouter } from "./routers/settings";

export const appRouter = createTRPCRouter({
  mix: mixRouter,
  auth: authRouter,
  show: showRouter,
  user: userRouter,
  settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
