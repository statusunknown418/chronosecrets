import { NewSecretEmail } from "@/components/emails/NewSecretEmail";
import scheduleNotification from "@/defer/scheduleNotification";
import { db } from "@/lib/db";
import { resend } from "@/lib/email";
import { assignOptions } from "@defer/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const notifyReceiverSchema = z.object({
  receiverId: z.string(),
  secretId: z.string(),
  secretTitle: z.string(),
  revealingDate: z.date(),
});
export type NotifyReceiverInput = z.infer<typeof notifyReceiverSchema>;

export const notifySecretReceiver = async (input: NotifyReceiverInput) => {
  const receiverProfile = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.id, input.receiverId),
  });

  if (!receiverProfile) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Receiver not found",
    });
  }

  const delayed = assignOptions(scheduleNotification, { delay: input.revealingDate });

  await delayed({
    receiverEmail: receiverProfile.email || "",
    receiverId: input.receiverId,
    receiverName: receiverProfile.name || "",
    receiverUsername: receiverProfile.username || "",
    secretId: input.secretId,
    secretTitle: input.secretTitle,
  });

  return await resend.emails.send({
    from: "Wait4it - [Notifications] <onboarding@resend.dev>",
    subject: "There's a new secret for you!",
    text: "Powered by MeowStudios",
    to: "alvarodevcode@outlook.com",
    reply_to: "alvarodevcode@outlook.com",
    react: NewSecretEmail({
      receiverName: receiverProfile.name || "",
      receiverEmail: receiverProfile.email || "",
      receiverUsername: receiverProfile.username || "",
      secretId: input.secretId,
      secretTitle: input.secretTitle,
    }),
  });
};
