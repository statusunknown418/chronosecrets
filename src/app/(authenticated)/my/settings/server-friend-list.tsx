import { FriendsList } from "@/components/my/FriendsList";
import { api } from "@/lib/trpc/api";

export const ServerFriendListRequests = async () => {
  const friends = await api.friendships.getFriends.query();

  return <FriendsList friendships={friends} />;
};
