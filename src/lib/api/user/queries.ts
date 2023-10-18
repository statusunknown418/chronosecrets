import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { TRPCError } from "@trpc/server";
import { or, sql } from "drizzle-orm";
import { getAllFriendships } from "../friendships/queries";

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
    const isKnown = known.find((friendship) => friendship.friends.id === person.id);

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

  return db.query.friendships.findMany({
    where: (t, { eq, and }) => and(eq(t.userId, user.id), eq(t.requestAccepted, false)),
    with: {
      friends: true,
    },
  });
}

export type Requests = Awaited<ReturnType<typeof getPendingRequestsForViewer>>;
