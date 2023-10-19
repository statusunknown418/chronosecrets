import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!secret) {
    return NextResponse.json(
      { error: true, message: "Missing secret" },
      {
        status: 403,
      },
    );
  }

  return NextResponse.json({ message: "pong", secret });
};
