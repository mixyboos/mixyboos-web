import { readFile } from "node:fs/promises";
import { getTestFixtureAudioBuffer } from "@/lib/utils/bufferUtils";
import { StatusCodes } from "http-status-codes";
import { v4 as uuid } from "uuid";

test("test file upload", async () => {
  const form = new FormData();
  const fixture = getTestFixtureAudioBuffer();
  const mixId = uuid();

  form.append("Content-Type", "application/octet-stream");
  // form.append("file", new Blob([getTestFixtureAudioBuffer()]));
  form.append("file", new Blob([await readFile(fixture)]));
  form.append("mixId", mixId);
  const result = await fetch(`${process.env.BASE_URL as string}/api/upload`, {
    method: "POST",
    body: form,
  });

  expect(result.status).toBe(StatusCodes.OK);
}, 50000);
