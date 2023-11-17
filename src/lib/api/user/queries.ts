import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { friendships, users } from "@/lib/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq, or, sql } from "drizzle-orm";
import { getAllFriendships } from "../friendships/queries";

export async function getSafeUserById(id: string) {
  const user = await db.query.users.findFirst({
    where: (t) => eq(t.id, id),
    columns: {
      name: true,
      username: true,
      email: true,
      image: true,
    },
  });

  return user;
}

/**
 * @description TODO: Remove t1-t2 once the query is as fast as possible
 */
export async function findUserByUsernameOrEmail(usernameOrEmail: string) {
  const t1 = Date.now();
  const value = `%${usernameOrEmail}%`;
  const knownPeoplePromise = getAllFriendships();

  const peoplePromise = db
    .select()
    .from(users)
    .where(or(sql`${users.username} like ${value}`, sql`${users.email} like ${value}`));

  const [people, known] = await Promise.all([peoplePromise, knownPeoplePromise]);

  const flattened = people.map((person) => {
    const isKnown = known.people.find(
      (friendship) =>
        friendship.friends.id === person.id || friendship.source.id === person.id,
    );

    return {
      ...person,
      alreadyFriends: !!isKnown && isKnown.requestAccepted,
      alreadyRequested: !!isKnown,
    };
  });

  const t2 = Date.now();

  return {
    people: flattened,
    took: t2 - t1,
  };
}

export async function getPendingRequestsForViewer() {
  const { session } = await getUserAuth();

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to view your friends.",
    });
  }

  const { user } = session;

  const data = await db.query.friendships.findMany({
    where: (t, { eq, and }) => and(eq(t.userId, user.id), eq(t.requestAccepted, false)),
    with: {
      source: true,
    },
  });

  return {
    people: data,
    viewer: session.user,
  };
}

export type Requests = Awaited<ReturnType<typeof getPendingRequestsForViewer>>;

export async function cancelOrDeleteFriendRequest(input: {
  userId: string;
  sourceId: string;
}) {
  const { session } = await getUserAuth();

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to view your friends.",
    });
  }

  try {
    await db
      .delete(friendships)
      .where(
        and(
          eq(friendships.userId, input.userId),
          eq(friendships.sourceId, input.sourceId),
        ),
      );

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
