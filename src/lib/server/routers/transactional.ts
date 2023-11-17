import {
  newFriendRequestNotification,
  newFriendRequestNotificationSchema,
  notifyReceiverSchema,
  notifySecretReceiver,
} from "@/lib/api/transactional/mutations";
import { publicProcedure, router } from "../trpc";

export const transactionalRouter = router({
  notifySecretReceiver: publicProcedure
    .input(notifyReceiverSchema)
    .mutation(({ input }) => {
      return notifySecretReceiver(input);
    }),
  newFriendRequest: publicProcedure
    .input(newFriendRequestNotificationSchema)
    .mutation(({ input }) => {
      return newFriendRequestNotification(input);
    }),
});
