import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import {
  secretIdSchema,
  secretShareableUrlSchema,
  secrets,
  type SecretId,
} from "@/lib/db/schema/secrets";
import { env } from "@/lib/env.mjs";
import { TRPCError } from "@trpc/server";
import CryptoJS from "crypto-js";
import { and, eq } from "drizzle-orm";
import { mapEncryptionTypeToAlgo } from "./mutations";

export const buildFullShareableUrl = (shareableUrl: string) => {
  if (env.NODE_ENV === "development") {
    return `http://localhost:3000/shared/${shareableUrl}`;
  }

  return `https://${env.VERCEL_URL}/shared/${shareableUrl}`;
};

export const getSecrets = async () => {
  const { session } = await getUserAuth();

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to view your secrets.",
    });
  }

  const s = await db.query.secrets.findMany({
    where: (t, { eq }) => eq(t.createdByUserId, session?.user.id!),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  return { secrets: s, session };
};

/**
 *
 * @description We can safely return the decrypted content because
 * the user is authenticated and the secret belongs to them
 */
export const getSecretById = async (id: SecretId) => {
  const { session } = await getUserAuth();
  const { id: secretId } = secretIdSchema.parse({ id });

  try {
    const [s] = await db
      .select()
      .from(secrets)
      .where(
        and(eq(secrets.id, secretId), eq(secrets.createdByUserId, session?.user.id!)),
      );

    const decrypted = mapEncryptionTypeToAlgo(s.encryptionType)
      .decrypt(s.content, env.NEXTAUTH_SECRET!)
      .toString(CryptoJS.enc.Utf8);

    s.content = decrypted;

    return { secret: s };
  } catch (error) {
    return { secret: null, error };
  }
};

/**
 *
 * @description Here we do need to check if the secret is revealed or not to decide
 * if it's safe to return the decrypted content
 */
export const getSecretByShareableUrl = async (shareableUrl: string) => {
  const { shareableUrl: url } = secretShareableUrlSchema.parse({ shareableUrl });

  try {
    const [s] = await db.query.secrets.findMany({
      where: (t, { eq }) => eq(t.shareableUrl, url),
      with: {
        attachments: true,
      },
    });

    if (!s) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Secret not found.",
      });
    }

    if (s.revealed) {
      const decrypted = mapEncryptionTypeToAlgo(s.encryptionType)
        .decrypt(s.content, env.NEXTAUTH_SECRET!)
        .toString(CryptoJS.enc.Utf8);

      s.content = decrypted;
    }

    return { shared: s };
  } catch (error) {
    return { shared: null, error };
  }
};
