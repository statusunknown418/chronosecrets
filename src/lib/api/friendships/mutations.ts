import { db } from "@/lib/db";
import { FriendshipSchema, friendships } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export const createFriendRequest = async (data: FriendshipSchema) => {
  try {
    await db.insert(friendships).values(data);
    return { success: true };
  } catch (error) {
    return { error };
  }
};

export const acceptFriendRequest = async (data: FriendshipSchema) => {
  try {
    await db
      .update(friendships)
      .set({ requestAccepted: true })
      .where(
        and(eq(friendships.sourceId, data.sourceId), eq(friendships.userId, data.userId)),
      );
    return { success: true };
  } catch (error) {
    return { error };
  }
};
