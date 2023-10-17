import { db } from "@/lib/db";

export const findUserByUsernameOrEmail = async (usernameOrEmail: string) => {
  return await db.query.users.findMany({
    where: (t, { or, ilike }) =>
      or(ilike(t.username, usernameOrEmail), ilike(t.email, usernameOrEmail)),
  });
};
