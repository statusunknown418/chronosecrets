import helloWorld from "@/defer/helloWorld";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await helloWorld("hi");
    return NextResponse.json({ message: "done" });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(error, { status: 500 });
  }
}
