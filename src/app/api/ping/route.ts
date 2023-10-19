import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const body = await req.json();

  return NextResponse.json({ message: "pong", body });
};
