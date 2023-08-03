import { liveShows } from "@/db/schema";
import { ShowStatus } from "@/lib/models";
import { createPusherServer } from "@/lib/services/realtime";
import { showRouter } from "@/server/api/routers/show";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCContext } from "@/server/api/trpc";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Process a POST request
  // const ctx = await createTRPCContext({ req, res });
  // const userApi = userRouter.createCaller(ctx);
  // const showApi = showRouter.createCaller(ctx);

  // const { name: streamKey } = req.body as { name: string };
  // if (!streamKey) {
  //   return new NextResponse(
  //     JSON.stringify({ message: "No stream key found in request!" }),
  //     { status: StatusCodes.BAD_REQUEST },
  //   );
  // }
  // const user = await userApi.getByStreamKey({ streamKey });

  // if (!user) {
  //   return new NextResponse(JSON.stringify({ message: "Unauthorised!" }), {
  //     status: StatusCodes.UNAUTHORIZED,
  //   });
  // }
  // const show = await showApi.checkForInProgress({ userId: user.id });

  // if (!show) {
  //   return new NextResponse(
  //     JSON.stringify({ message: "No in progress show found for user!!" }),
  //     {
  //       status: StatusCodes.BAD_REQUEST,
  //     },
  //   );
  // }

  // //show go bye bye
  // /*
  //   await scheduler.TriggerJob(new JobKey("SaveLiveShowJob", "DEFAULT"), new JobDataMap(
  //       new Dictionary<string, string> {
  //           {"ShowId", show.Id.ToString()}
  //       }
  //   ));
  //   */
  // show.status = ShowStatus.ended;
  // await db
  //   .update(liveShows)
  //   .set({ ...show, status: "FINISHED" })
  //   .where(eq(liveShows.id, show.id));

  // await createPusherServer().trigger(`ls_${show.id}`, "show-finished", show);
  // return new NextResponse(JSON.stringify(show), {
  return new NextResponse(JSON.stringify({}), {
    status: StatusCodes.OK,
  });
}
