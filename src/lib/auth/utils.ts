import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "../db";
import { users } from "../db/schema";

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session };
};

export const getFullUser = async () => {
  const { session } = await getUserAuth();
  if (!session) return null;
  const { user } = session;

  const [data] = await db
    .select()
    .from(users)
    .where(({ id }) => eq(id, user.id));

  return data;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/api/auth/signin");
};
