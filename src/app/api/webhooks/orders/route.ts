import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { verifyWebhookSignature } from "@/lib/payments/lemon-squeezy";
import { OrderWebhookPayload } from "@/lib/payments/lemon.models";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = (await verifyWebhookSignature(req)) as OrderWebhookPayload;
    const previousTokens = Number(body.meta.custom_data.previous_tokens);
    const tokensToAdd = Number(body.meta.custom_data.tokens);
    const userId = body.meta.custom_data.user_id;

    if (!body.meta.custom_data.user_id || !previousTokens) {
      return NextResponse.json({
        success: false,
        error: "No user id or missing previous state",
      });
    }

    await db
      .update(users)
      .set({ credits: previousTokens + tokensToAdd })
      .where(eq(users.id, userId));

    return NextResponse.json({
      success: true,
      message: `Added ${tokensToAdd} tokens to user ${userId}`,
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: e,
      },
      {
        status: 500,
      },
    );
  }
};
