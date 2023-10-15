import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  NewSecretParams,
  SecretId,
  UpdateSecretParams,
  insertSecretSchema,
  secretIdSchema,
  secrets,
  updateSecretSchema,
} from "@/lib/db/schema/secrets";
import { env } from "@/lib/env.mjs";
import { and, eq } from "drizzle-orm";
import slugify from "slugify";

export const createSecret = async (secret: NewSecretParams) => {
  const { session } = await getUserAuth();

  const slug = slugify(`${secret.title}-${Math.floor(Math.random() * 1e6)}`);

  const newSecret = insertSecretSchema.parse({
    ...secret,
    createdByUserId: session?.user.id!,
    /** Linked to https://linear.app/wait4it/issue/TOL-28/maybe-update-secretshareableurl-to-be-title-cuid2 */
    shareableUrl: `https://${env.VERCEL_URL || "localhost:3000"}/share/${slug}`,
  });

  try {
    await db.insert(secrets).values(newSecret);
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    return { error: message };
  }
};

export const updateSecret = async (id: SecretId, secret: UpdateSecretParams) => {
  const { session } = await getUserAuth();
  const { id: secretId } = secretIdSchema.parse({ id });
  const newSecret = updateSecretSchema.parse({
    ...secret,
    createdByUserId: session?.user.id!,
  });
  try {
    await db
      .update(secrets)
      .set(newSecret)
      .where(
        and(eq(secrets.id, secretId!), eq(secrets.createdByUserId, session?.user.id!)),
      );
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    return { error: message };
  }
};

export const deleteSecret = async (id: SecretId) => {
  const { session } = await getUserAuth();
  const { id: secretId } = secretIdSchema.parse({ id });
  try {
    await db
      .delete(secrets)
      .where(
        and(eq(secrets.id, secretId!), eq(secrets.createdByUserId, session?.user.id!)),
      );
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";

    return { error: message };
  }
};
