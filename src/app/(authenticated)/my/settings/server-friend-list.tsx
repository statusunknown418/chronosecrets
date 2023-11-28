import { FriendsList } from "@/components/my/FriendsList";
import { getAllFriendships } from "@/lib/api/friendships/queries";

export const ServerFriendListRequests = async () => {
  const friends = await getAllFriendships();

  return <FriendsList friendships={friends} />;
};
