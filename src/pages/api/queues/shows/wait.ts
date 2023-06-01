import { createPusherServer } from "@/lib/services/realtime";
import { prisma } from "@/server/db";
import { StatusCodes } from "http-status-codes";
import { Queue } from "quirrel/next";
import superagent from "superagent";

export default Queue(
  "api/queues/shows/wait", // 👈 the route it's reachable on
  async (job: { showId: string }) => {
    const rt = createPusherServer();
    const url = `https://live-mixyboos.dev.fergl.ie:9091/hls/${job.showId}/index.m3u8`;

    const show = await prisma.shows.findUnique({
      where: {
        id: job.showId
      }
    })

    if(!show){
      throw new Error(`Unable to find show ${job.showId}`)
    }

    const res = await superagent
      .get(url)
      .retry(10, (err, res) => {
        console.log("wait", "result", res.notFound, res.statusCode, res.status);
        const shouldRetry = res.notFound;
        if (shouldRetry) {
          console.log("wait", "Waiting to retry");
          Atomics.wait(
            new Int32Array(new SharedArrayBuffer(4)),
            0,
            0,
            2 * 1000
          );
          return true;
        }
        return res.notFound;
      })
      .catch((err) => {
        console.log("WaitForShow", "Error fetching retrying");
      });

    console.log("wait", "Finished waiting for show", res?.statusCode);
    if (res?.statusCode === StatusCodes.OK) {
      //showtime

      //update mix entry in db


      //push status to client
      await rt.trigger(`ls_${job.showId}`, "show-started", {
        id: job.showId,
      });
      console.log("waitForShow", "show-started", job.showId);
      return;
    }

    //notime
    await rt.trigger(`ls_${job.showId}`, "show-failure", {
      id: job.showId,
    });
    console.error("waitForShow", "FAILED: show-failure", job.showId);
  }
);
