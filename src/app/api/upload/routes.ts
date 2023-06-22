import { Readable } from "stream";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;

    const isFile = typeof value == "object";

    if (isFile) {
      const blob = value as Blob;
      const filename = blob.name;

      //conver the blob to stream
      const buffer = Buffer.from(await blob.arrayBuffer());
      const stream = Readable.from(buffer);

      const uploadStream = bucket.openUploadStream(filename, {
        // make sure to add content type so that it will be easier to set later.
        contentType: blob.type,
        metadata: {}, //add your metadata here if any
      });

      // pipe the readable stream to a writeable stream to save it to the database
      await stream.pipe(uploadStream);
    }
  }
  return NextResponse.json({ success: true });
}
