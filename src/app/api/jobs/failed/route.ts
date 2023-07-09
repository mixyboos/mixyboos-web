import { processMixQueue } from "@/app/api/queues/upload/mix/route";
import { StatusCodes } from "http-status-codes";
import { type NextRequest } from "next/server";
import path from "path";
import os from "os";
import fs from "fs";

const extensions = ["mp3", "wav", "aiff", "mp4", "ogg"];

export async function POST(req: NextRequest) {
  const { mixId } = (await req.json()) as { mixId: string };

  let fileName = "";
  let exists = false;
  for (const extension of extensions) {
    fileName = path.join(os.tmpdir(), `${mixId}.${extension}`);
    if (fs.existsSync(fileName)) {
      exists = true;
      break;
    }
  }
  if (exists) {
    await processMixQueue.enqueue({ filePath: fileName, mixId }, { delay: 1 });
    return StatusCodes.OK;
  }

  return StatusCodes.NO_CONTENT;
}
