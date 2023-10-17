import { getAllFriendships } from "@/lib/api/friendships/queries";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  try {
    const friends = await getAllFriendships();
    return NextResponse.json(friends, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }

    return NextResponse.json({ error: err }, { status: 500 });
  }
}
