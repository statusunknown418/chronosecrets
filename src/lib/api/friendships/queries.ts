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

  const data = await db.query.friendships.findMany({
    where: (t, { eq, or }) => or(eq(t.sourceId, user.id), eq(t.userId, user.id)),
    orderBy: (t, { asc }) => asc(t.requestAccepted),
    with: {
      friends: true,
      source: true,
    },
  });

  return {
    people: data,
    viewer: user,
  };
};

export type GetAllFriendshipsOutput = Awaited<ReturnType<typeof getAllFriendships>>;

export const getAcceptedFriends = async () => {
  const { session } = await getUserAuth();

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to view your friends.",
    });
  }

  const { user } = session;

  const people = await db.query.friendships.findMany({
    where: (t, { eq, and, or }) =>
      or(
        and(eq(t.sourceId, user.id), eq(t.requestAccepted, true)),
        eq(t.userId, user.id),
      ),
    with: {
      friends: true,
      source: true,
    },
  });

  return {
    people,
    viewer: user,
  };
};
