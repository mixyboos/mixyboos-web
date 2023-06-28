import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { generateSasToken } from "@/lib/services/azure/sas-token";
import { uploadFile, uploadFolder } from "@/lib/services/azure/upload";
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
      generateSasToken("mixyboos", "audio")
        .then((token) => {
          console.log("upload/mix/route", "SAS TOKEN", token);
          uploadFolder(token, outputDir, "audio", mixId);
        })
        .catch((err) => {
          console.log("route", "Error uploading folder", err);
        });
    });
  }
);
export const POST = processMixQueue;
