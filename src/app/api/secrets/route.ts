import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createSecret } from "@/lib/api/secrets/mutations";
import { getSecrets } from "@/lib/api/secrets/queries";
import { insertSecretParams } from "@/lib/db/schema/secrets";

/**
 *
 * @description Not allowing API users to get secrets by ID or shareable URL for security reasons
 */
export async function GET() {
  try {
    const { secrets } = await getSecrets();

    if (!secrets) return NextResponse.json({ error: true }, { status: 500 });

    return NextResponse.json(secrets, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}

export async function POST(req: Request) {
  try {
    const validatedData = insertSecretParams.parse(await req.json());
    const { success, error } = await createSecret(validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });

    revalidatePath("/secrets"); // optional - assumes you will have named route same as entity

    return NextResponse.json(success, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}
