import { ShowStatus } from "@/lib/models";
import { createPusherServer } from "@/lib/services/realtime";
import { showRouter } from "@/server/api/routers/show";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCContext } from "@/server/api/trpc";
import { StatusCodes } from "http-status-codes";
import { type NextApiRequest, type NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  // Process a POST request
  const ctx = await createTRPCContext({ req });
  const userApi = userRouter.createCaller(ctx);
  const showApi = showRouter.createCaller(ctx);

  const { name: streamKey } = req.body as { name: string };
  if (!streamKey) {
    return new NextResponse(
      JSON.stringify({ message: "No stream key found in request!" }),
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  const user = await userApi.getByStreamKey({ streamKey });

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorised!" }), {
      status: StatusCodes.UNAUTHORIZED,
    });
  }
  const show = await showApi.checkForInProgress({ userId: user.id });

  if (!show) {
    return new NextResponse(
      JSON.stringify({ message: "No in progress show found for user!!" }),
      {
        status: StatusCodes.BAD_REQUEST,
      }
    );
  }

  //show go bye bye
  /*
    await scheduler.TriggerJob(new JobKey("SaveLiveShowJob", "DEFAULT"), new JobDataMap(
        new Dictionary<string, string> {
            {"ShowId", show.Id.ToString()}
        }
    ));
    */
  show.status = ShowStatus.ended;
  await ctx.prisma.liveShow.update({
    where: {
      id: show.id,
    },
    data: { ...show, status: "FINISHED" },
  });
  await createPusherServer().trigger(`ls_${show.id}`, "show-finished", show);
  return new NextResponse(JSON.stringify(show), {
    status: StatusCodes.OK,
  });
}
