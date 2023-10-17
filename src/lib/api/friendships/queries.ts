import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const getAllFriendships = async () => {
  const { session } = await getUserAuth();

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to view your friends.",
    });
  }

  const { user } = session;

  return await db.query.friendships.findMany({
    where: (t, { eq }) => eq(t.userId, user.id),
    with: {
      friends: true,
    },
  });
};

export const getAcceptedFriends = async () => {
  const { session } = await getUserAuth();

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to view your friends.",
    });
  }

  const { user } = session;

  return await db.query.friendships.findMany({
    where: (t, { eq, and }) => and(eq(t.userId, user.id), eq(t.requestAccepted, true)),
    with: {
      friends: true,
    },
  });
};
