import { waitForShowQueue } from "@/app/api/queues/shows/wait/route";
import { prisma } from "@/server/db";
import { StatusCodes } from "http-status-codes";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json(
      { message: "No stream key found in request!" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const data = await req.formData();
  const streamKey = data.get("name")?.toString();
  if (!streamKey) {
    return NextResponse.json(
      { message: "No stream key found in request!" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      streamKey,
    },
  });
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorised!" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  const show = await prisma.liveShow.findFirst({
    where: {
      status: { in: ["AWAITING", "STREAMING"] },
      userId: user.id,
    },
  });
  if (!show) {
    return NextResponse.json(
      { message: "No in progress show found for user!" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  await waitForShowQueue.enqueue(show.id, { delay: 1 });
  return new NextResponse("Redirecting.....", {
    status: StatusCodes.MOVED_TEMPORARILY,
    headers: {
      "Content-Type": "text/plain",
      Location: show.id,
    },
  });
}
