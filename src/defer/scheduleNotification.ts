import { SecretAvailableEmail } from "@/components/emails/SecretAvailableEmail";
import { REPLY_TO_EMAIL } from "@/lib/constants";
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
  const emailPromise = resend.emails.send({
    from: "ChronoSecrets - [Revealing] <onboarding@chronosecrets.app>",
    subject: "A secret has just been revealed!",
    text: "Powered by MeowStudios",
    to: input.receiverEmail,
    reply_to: REPLY_TO_EMAIL,
    react: SecretAvailableEmail(input),
  });

  const update = db
    .update(secrets)
    .set({ revealed: true })
    .where(eq(secrets.id, Number(input.secretId)));

  const [email, secret] = await Promise.all([emailPromise, update]);

  return {
    email,
    secret: secret.insertId,
  };
};

export default defer(scheduleNotificationForReceiver, {
  concurrency: 2,
});
