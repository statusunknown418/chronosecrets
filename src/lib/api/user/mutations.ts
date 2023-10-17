import { getFullUser, getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { UpdateUserSchema, updateUserSchema, users } from "@/lib/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const flattenUsername = (username?: string | null) => {
  return username?.includes("@") ? username : `@${username}`;
};

export const updateUser = async (id: string, data: UpdateUserSchema) => {
  try {
    const { session } = await getUserAuth();

    if (!session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to update your user.",
      });
    }

    const newUser = updateUserSchema.parse({
      ...session.user,
      ...data,
    });

    await db
      .update(users)
      .set({
        ...newUser,
        username: flattenUsername(newUser.username),
      })
      .where(eq(users.id, id));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    return { error: message };
  }
};

export const checkUsernameAvailable = async (username: string) => {
  const viewer = await getFullUser();
  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, flattenUsername(username)));

  if (flattenUsername(username) === flattenUsername(viewer?.username)) {
    return { available: true };
  }

  return { available: user.length === 0 };
};
