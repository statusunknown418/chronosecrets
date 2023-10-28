import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { usersToSecrets } from "@/lib/db/schema";
import {
  NewSecretParams,
  Secret,
  SecretId,
  UpdateSecretParams,
  insertSecretSchema,
  secretIdSchema,
  secrets,
  updateSecretSchema,
} from "@/lib/db/schema/secrets";
import { env } from "@/lib/env.mjs";
import { createId } from "@paralleldrive/cuid2";
import { TRPCError } from "@trpc/server";
import CryptoJS from "crypto-js";
import { and, eq } from "drizzle-orm";
import slugify from "slugify";
import { linkAttachmentToSecret } from "../attachments/mutations";
import { buildFullShareableUrl } from "./queries";

export const mapEncryptionTypeToAlgo = (encryptionType: Secret["encryptionType"]) => {
  switch (encryptionType) {
    case "AES":
      return CryptoJS.AES;
    case "DES":
      return CryptoJS.DES;
    case "RC4":
      return CryptoJS.RC4;
    case "Rabbit":
      return CryptoJS.Rabbit;
    default:
      return CryptoJS.RC4;
  }
};

export const createSecret = async (secret: NewSecretParams) => {
  const t1 = performance.now();
  const { session } = await getUserAuth();

  const slugId = createId();
  const slug = slugify(`${secret.title}-${slugId}`);
  const hashed = mapEncryptionTypeToAlgo(secret.encryptionType)
    .encrypt(secret.content, env.NEXTAUTH_SECRET!)
    .toString();

  const newSecret = insertSecretSchema.parse({
    ...secret,
    createdByUserId: session?.user.id!,
    /** Linked to https://linear.app/wait4it/issue/TOL-28/maybe-update-secretshareableurl-to-be-title-cuid2 */
    shareableUrl: buildFullShareableUrl(slug),
  });

  if (!secret.receiverId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Secret receiverId is required",
    });
  }

  try {
    const { insertId } = await db.insert(secrets).values({
      ...newSecret,
      content: hashed,
    });

    const makeRelation = db.insert(usersToSecrets).values({
      secretId: Number(insertId),
      userId: secret.receiverId,
    });

    const insertAttachments = linkAttachmentToSecret(
      Number(insertId),
      secret.attachments || [],
    );

    await Promise.all([makeRelation, insertAttachments]);

    const t2 = performance.now();

    return {
      success: true,
      took: Math.ceil(t2 - t1),
      secret: {
        id: insertId,
        receiverId: secret.receiverId,
        title: secret.title,
        shareableUrl: buildFullShareableUrl(slug),
        revealingDate: secret.revealingDate,
      },
    };
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

  const hashed = mapEncryptionTypeToAlgo(secret.encryptionType)
    .encrypt(secret.content, env.NEXTAUTH_SECRET!)
    .toString();

  try {
    await db
      .update(secrets)
      .set({ ...newSecret, content: hashed, editedAt: new Date(), wasEdited: true })
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
