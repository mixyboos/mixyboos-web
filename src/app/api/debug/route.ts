import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ debug: "deez nuts" });
}
