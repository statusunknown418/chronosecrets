import {
  acceptFriendRequest,
  createFriendRequest,
} from "@/lib/api/friendships/mutations";
import { getAcceptedFriends, getAllFriendships } from "@/lib/api/friendships/queries";
import { getPendingRequestsForViewer } from "@/lib/api/user/queries";
import { friendshipSchema } from "@/lib/db/schema";
import { publicProcedure, router } from "../trpc";

export const friendshipsRouter = router({
  getFriends: publicProcedure.query(() => {
    return getAllFriendships();
  }),
  getAcceptedFriends: publicProcedure.query(() => {
    return getAcceptedFriends();
  }),
  sendFriendRequest: publicProcedure.input(friendshipSchema).mutation(({ input }) => {
    return createFriendRequest(input);
  }),
  acceptFriendRequest: publicProcedure.input(friendshipSchema).mutation(({ input }) => {
    return acceptFriendRequest(input);
  }),
  getPendingRequestsForViewer: publicProcedure.query(async () => {
    return getPendingRequestsForViewer();
  }),
});
