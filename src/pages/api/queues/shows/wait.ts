import { StatusCodes } from "http-status-codes";
import { Queue } from "quirrel/next";
import superagent from "superagent";
import rt from "@/lib/services/realtime";

export default Queue(
  "api/queues/shows/wait", // 👈 the route it's reachable on
  async (job: { showId: string }) => {
    console.log("WaitForShow", job);
    const url = `https://live-mixyboos.dev.fergl.ie:9091/hls/${job.showId}/index.m3u8`;
    console.log("WaitForShow", "Checking URL", url);

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
      const result = await rt.trigger(`ls_${job.showId}`, "show-started", {
        id: job.showId,
      });
      console.log("waitForShow", "show-started", job.showId);
      return;
    }

    //notime
    const result = await rt.trigger(`ls_${job.showId}`, "show-failure", {
      id: job.showId,
    });
    console.error("waitForShow", "FAILED: show-failure", job.showId);
  }
);
