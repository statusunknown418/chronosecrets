import { updateUser } from "@/lib/api/user/mutations";
import { getFullUser } from "@/lib/auth/utils";
import { updateUserSchema } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  try {
    const user = await getFullUser();
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "missing user_id", code: "UNPROCESSABLE_ENTITY" },
        { status: 400 },
      );
    }

    const validated = updateUserSchema.safeParse(await req.json());

    if (!validated.success) {
      return NextResponse.json({ error: validated.error }, { status: 500 });
    }

    const { success, error } = await updateUser(id, validated.data);

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
