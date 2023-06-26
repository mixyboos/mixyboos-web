import { StatusCodes } from "http-status-codes";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!req.body)
    return NextResponse.json(
      { message: "No stream key found in request!" },
      { status: StatusCodes.BAD_REQUEST }
    );

  const data = await req.formData();
  const streamKey = data.get("name");
  return NextResponse.json({ hello: streamKey }, { status: StatusCodes.OK });
}

//   // Process a POST request
//   const ctx = await createTRPCContext({ req, res });
//   const userApi = userRouter.createCaller(ctx);
//   const showApi = showRouter.createCaller(ctx);

//   const { name: streamKey } = req.body as { name: string };
//   if (!streamKey) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: "No stream key found in request!" });
//   }
//   const user = await userApi.getByStreamKey({ streamKey });

//   if (!user) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ message: "Unauthorised!" });
//   }
//   const show = await showApi.checkForStart({ userId: user.id });

//   if (!show) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: "No in progress show found for user!" });
//   }

//   //it's showtime....
//   await waitForShow.enqueue({ showId: show.id }, { delay: 1 });

//   //nginx-rtmp-proxy needs MOVED_TEMPORARILY to rename the show path
//   res.redirect(StatusCodes.MOVED_TEMPORARILY, show.id);
// }
