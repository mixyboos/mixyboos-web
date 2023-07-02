import { waitForShowQueue } from "@/app/api/queues/shows/wait/route";
import { LiveShowStatus, liveShows, users } from "@/db/schema";
import { db } from "@/server/db";
import { and, eq, or } from "drizzle-orm";
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

  const results = await db
    .selectDistinct()
    .from(users)
    .where(eq(users.streamKey, streamKey));
  const user = results[0];
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorised!" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }
  const showResults = await db
    .selectDistinct()
    .from(liveShows)
    .where(
      and(
        eq(liveShows.userId, user.id),
        or(eq(liveShows.status, "AWAITING"), eq(liveShows.status, "STREAMING"))
      )
    );
  const show = showResults[0];
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
