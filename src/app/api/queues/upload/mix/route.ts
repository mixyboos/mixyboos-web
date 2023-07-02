import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { uploadFolder } from "@/lib/services/azure/serverUploader";
import { Queue } from "quirrel/next-app";

export const processMixQueue = Queue(
  "api/queues/upload/mix", // 👈 the route it's reachable on
  async (job: { filePath: string; mixId: string }) => {
    const { filePath, mixId } = job;
    const outputDir = `${os.tmpdir()}/${mixId}`;
    fs.mkdirSync(outputDir);

    const command = `ffmpeg `;
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
        .then((r) => {
          //probably need to tag the mix in some way here?
        })
        .catch((err) => {
          console.log("route", "error uploading output folder", err);
        });
    });
  }
);
export const POST = processMixQueue;
