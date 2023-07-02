import { writeFile } from "fs/promises";
import { getFileExtension } from "@/lib/utils/fileUtils";
import { NextResponse, type NextRequest } from "next/server";
import { processMixQueue } from "../queues/upload/mix/route";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  const id: string | null = data.get("mixId") as unknown as string;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `/tmp/${id}.${getFileExtension(file.name)}`;
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);
  await processMixQueue.enqueue({ filePath: path, mixId: id }, { delay: 1 });
  return NextResponse.json({ success: true });
}
