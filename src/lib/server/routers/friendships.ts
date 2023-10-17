import { createFriendRequest } from "@/lib/api/friendships/mutations";
import { getAllFriendships } from "@/lib/api/friendships/queries";
import { friendshipSchema } from "@/lib/db/schema";
import { publicProcedure, router } from "../trpc";

export const friendshipsRouter = router({
  getFriends: publicProcedure.query(async () => {
    return getAllFriendships();
  }),
  sendFriendRequest: publicProcedure
    .input(friendshipSchema)
    .mutation(async ({ input }) => {
      return createFriendRequest(input);
    }),
});
