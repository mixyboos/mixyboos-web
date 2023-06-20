import { authRouter } from "@/server/api/routers/auth";
import { mixRouter } from "@/server/api/routers/mix";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";
import { settingsRouter } from "./routers/settings";
import { showRouter } from "./routers/show";
import { uploadRouter } from "./routers/upload";

export const appRouter = createTRPCRouter({
  mix: mixRouter,
  auth: authRouter,
  show: showRouter,
  user: userRouter,
  upload: uploadRouter,
  settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
