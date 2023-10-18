import { findUserByUsernameOrEmail } from "@/lib/api/user/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const search = new URL(req.url).searchParams.get("search");

  if (!search) {
    return NextResponse.json({ error: "No search term provided" }, { status: 400 });
  }

  try {
    const people = await findUserByUsernameOrEmail(search);
    return NextResponse.json({ people, search }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
