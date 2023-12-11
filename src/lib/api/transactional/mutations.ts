import { NewFriendRequestEmail } from "@/components/emails/NewFriendRequestEmail";
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
    from: "ChronoSecrets - [Inbox] <onboarding@resend.dev>",
    subject: "There's a new secret for you!",
    text: "Powered by MeowStudios",
    to: "alvarodevcode@outlook.com",
    reply_to: "alvaro.aquije@icloud.com",
    react: NewSecretEmail({
      receiverName: receiverProfile.name || "",
      receiverEmail: receiverProfile.email || "",
      receiverUsername: receiverProfile.username || "",
      secretId: input.secretId,
      secretTitle: input.secretTitle,
    }),
  });
};

export const newFriendRequestNotificationSchema = z.object({
  sourceId: z.string(),
  sourceUsername: z.string(),
  targetId: z.string(),
  targetEmail: z.string(),
  targetUsername: z.string(),
});

export type NewFriendRequestNotificationInput = z.infer<
  typeof newFriendRequestNotificationSchema
>;

export const newFriendRequestNotification = async (
  input: NewFriendRequestNotificationInput,
) => {
  return await resend.emails.send({
    from: "ChronoSecrets - [Friendships] <onboarding@resend.dev>",
    subject: `${input.sourceUsername} wants to be your friend!`,
    text: "Powered by MeowStudios",
    to: "alvarodevcode@outlook.com",
    reply_to: "alvaro.aquije@icloud.com",
    react: NewFriendRequestEmail(input),
  });
};
