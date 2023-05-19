import { NextRequest, NextResponse } from "next/server";

export async function GET() {


  const data = {
    hello: "Sailor",
  };
  NextResponse.json({ data });
}
