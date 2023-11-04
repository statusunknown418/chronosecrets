import { SecretAvailableEmail } from "@/components/emails/SecretAvailableEmail";
import { db } from "@/lib/db";
import { secrets } from "@/lib/db/schema";

import { resend } from "@/lib/email";
import { defer } from "@defer/client";
import { eq } from "drizzle-orm";

export type NotifyAvailabilityDefer = {
  secretId: string;
  secretTitle: string;
  receiverId: string;
  receiverName: string;
  receiverEmail: string;
  receiverUsername: string;
};

const scheduleNotificationForReceiver = async (input: NotifyAvailabilityDefer) => {
  const email = await resend.emails.send({
    from: "Wait4it - [Notifications] <onboarding@resend.dev>",
    subject: "A secret has just been revealed!",
    text: "Powered by MeowStudios",
    to: "alvarodevcode@outlook.com",
    reply_to: "alvarodevcode@outlook.com",
    react: SecretAvailableEmail(input),
  });

  await db
    .update(secrets)
    .set({ revealed: true })
    .where(eq(secrets.id, Number(input.secretId)));

  return email;
};

export default defer(scheduleNotificationForReceiver, {
  concurrency: 5,
});
