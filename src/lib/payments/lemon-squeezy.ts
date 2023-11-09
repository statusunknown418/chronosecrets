import { LemonSqueezy } from "@lemonsqueezy/lemonsqueezy.js";
import { NextRequest, NextResponse } from "next/server";
import { env } from "../env.mjs";

export const payments = new LemonSqueezy(env.LEMON_SQUEEZY_TOKEN);

export async function getProductVariants(productId: number) {
  return payments.getVariants({
    productId,
  });
}

export async function verifyWebhookSignature(req: NextRequest) {
  const crypto = require("crypto");

  const body = await req.text();
  const signature = req.headers.get("X-Signature");

  const hmac = crypto.createHmac("sha256", env.PAYMENTS_WEBHOOK_SECRET);
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  const lemonSignature = Buffer.from(signature || "", "utf8");

  if (!crypto.timingSafeEqual(digest, lemonSignature)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid signature verified with crypto",
      },
      {
        status: 403,
      },
    );
  }

  return JSON.parse(body);
}
