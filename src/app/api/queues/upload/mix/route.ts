import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { uploadFolder } from "@/lib/services/azure/serverUploader";
import { Queue } from "quirrel/next-app";
import { db } from "@/server/db";
import { mixes } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as Sentry from "@sentry/nextjs";

export const processMixQueue = Queue(
  "api/queues/upload/mix", // 👈 the route it's reachable on
  async (job: { filePath: string; mixId: string }) => {
    const { filePath, mixId } = job;
    const outputDir = `${os.tmpdir()}/podnoms/${mixId}`;
    fs.mkdirSync(outputDir, {
      recursive: true,
    });

    // prettier-ignore
    const process = spawn("ffmpeg", [
      "-i",
      filePath,
      "-codec:", "copy",
      "-start_number", "0",
      "-hls_time", "10",
      "-hls_list_size", "0",
      "-f", "hls",
      `${outputDir}/${mixId}.m3u8`,
    ]);

    process.stdout.on("data", (data) => {
      console.log("processMixQueue", "stdout", data);
    });

    process.stderr.on("data", (data) => {
      console.log("processMixQueue", "stderr", data);
    });

    process.on("close", (code) => {
      console.log("processMixQueue", "close", code);
      if (code !== 0) {
        return;
      }

      uploadFolder(outputDir, "audio", path.join("mixes", mixId))
        .then(async (r) => {
          if (r) {
            //if client has saved mix then we are processed
            //if not client will check for file and set processed
            await db
              .update(mixes)
              .set({ isProcessed: true })
              .where(eq(mixes.id, mixId));
          }
        })
        .catch((err) => {
          console.log("route", "error uploading output folder", err);
          Sentry.captureException(err);
        });
    });
  }
);
export const POST = processMixQueue;
