import { verifyWebhookSignature } from "@/lib/payments/lemon-squeezy";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await verifyWebhookSignature(req);

    const data = await req.json();

    return NextResponse.json({
      success: false,
      error: "Unknown type, but message processed in subscriptions_route",
      name: data["meta"]["event_name"],
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
