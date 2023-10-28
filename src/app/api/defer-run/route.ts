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
      receiverId: "b76035cd-75de-4a66-bb5f-4c07643a87a0",
      secretId: "73",
      secretTitle: "Hello World",
    });
    return NextResponse.json({ message: "done" });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(error, { status: 500 });
  }
}
