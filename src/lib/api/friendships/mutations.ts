import { db } from "@/lib/db";
import { FriendshipSchema, friendships } from "@/lib/db/schema";

export const createFriendRequest = async (data: FriendshipSchema) => {
  try {
    await db.insert(friendships).values(data);
    return { success: true };
  } catch (error) {
    return { error };
  }
};
