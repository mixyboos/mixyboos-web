import { createPusherServer } from "@/lib/services/realtime";
import { showRouter } from "@/server/api/routers/show";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCContext } from "@/server/api/trpc";
import { StatusCodes } from "http-status-codes";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(StatusCodes.METHOD_NOT_ALLOWED);

  // Process a POST request
  const ctx = await createTRPCContext({ req, res });
  const userApi = userRouter.createCaller(ctx);
  const showApi = showRouter.createCaller(ctx);

  const { name: streamKey } = req.body as { name: string };
  if (!streamKey) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No stream key found in request!" });
  }
  const user = await userApi.getByStreamKey({ streamKey });

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorised!" });
  }
  const show = await showApi.checkForStart({ userId: user.id });

  if (!show) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No in progress show found for user!" });
  }

  //show go bye bye
  /*
    await scheduler.TriggerJob(new JobKey("SaveLiveShowJob", "DEFAULT"), new JobDataMap(
        new Dictionary<string, string> {
            {"ShowId", show.Id.ToString()}
        }
    ));
    */
  show.status = "FINISHED";
  await ctx.prisma.liveShow.update({
    where: {
      id: show.id,
    },
    data: { ...show },
  });
  await createPusherServer().trigger(`ls_${show.id}`, "show-finished", show);

  return res.status(StatusCodes.OK);
}
