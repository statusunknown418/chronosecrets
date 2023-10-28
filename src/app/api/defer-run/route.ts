import scheduleNotification from "@/defer/scheduleNotification";
import { assignOptions } from "@defer/client";
import { addMinutes } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const delayed = assignOptions(scheduleNotification, {
      delay: addMinutes(new Date(), 1),
    });

    await delayed({
      receiverEmail: "alvarodevcode@oulook.com",
      receiverId: "123",
      receiverName: "Alvaro",
      receiverUsername: "receiver",
      secretId: "73",
      secretTitle: "My secret",
    });
    return NextResponse.json({ message: "done" });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(error, { status: 500 });
  }
}
