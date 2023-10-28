import { SecretAvailableEmail } from "@/components/emails/SecretAvailableEmail";

import { resend } from "@/lib/email";
import { defer } from "@defer/client";

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

  return email;
};

export default defer(scheduleNotificationForReceiver);
