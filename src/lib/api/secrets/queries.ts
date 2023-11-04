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

  return `https://${env.EMAIL_URL}/shared/${shareableUrl}`;
};

export const getSecrets = async (search?: string) => {
  const { session } = await getUserAuth();

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to view your secrets.",
    });
  }

  const s = await db.query.secrets.findMany({
    where: (t, { eq, and, like }) =>
      and(
        eq(t.createdByUserId, session?.user.id!),
        search ? like(t.title, `%${search}%`) : undefined,
      ),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  return { secrets: s, session };
};

export const getSecretsByReceiver = async () => {
  const { session } = await getUserAuth();

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to view your secrets.",
    });
  }

  const s = await db.query.usersToSecrets.findMany({
    where: (t, { eq }) => eq(t.userId, session?.user.id!),
    with: {
      secret: {
        with: {
          creator: true,
        },
      },
    },
  });

  return { mine: s, session };
};

export type SecretsByReceiverResponse = Awaited<ReturnType<typeof getSecretsByReceiver>>;

export const getSecretByIdForReceiver = async (id: SecretId) => {
  const { session } = await getUserAuth();
  const { id: secretId } = secretIdSchema.parse({ id });

  try {
    const s = await db.query.usersToSecrets.findFirst({
      where: (t, { eq }) =>
        and(eq(t.secretId, secretId), eq(t.userId, session?.user.id!)),
      with: {
        secret: {
          with: {
            creator: true,
            attachments: true,
          },
        },
      },
    });

    if (!s) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Secret not found.",
      });
    }

    if (s.secret.revealed) {
      const decrypted = mapEncryptionTypeToAlgo(s.secret.encryptionType)
        .decrypt(s.secret.content, env.NEXTAUTH_SECRET!)
        .toString(CryptoJS.enc.Utf8);

      s.secret.content = decrypted;
    }

    return { secret: s.secret };
  } catch (err) {
    const error = err as TRPCError;

    return { secret: null, error };
  }
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
    const s = await db.query.secrets.findFirst({
      where: () =>
        and(eq(secrets.id, secretId), eq(secrets.createdByUserId, session?.user.id!)),
      with: {
        attachments: true,
        receivers: true,
      },
    });

    if (!s) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Secret not found.",
      });
    }

    const decrypted = mapEncryptionTypeToAlgo(s.encryptionType)
      .decrypt(s.content, env.NEXTAUTH_SECRET!)
      .toString(CryptoJS.enc.Utf8);

    s.content = decrypted;

    return { secret: s };
  } catch (err) {
    const error = err as TRPCError;

    return { secret: null, error };
  }
};

export type SecretByIdResponse = Awaited<ReturnType<typeof getSecretById>>;

/**
 *
 * @description Here we do need to check if the secret is revealed or not to decide
 * if it's safe to return the decrypted content
 */
export const getSecretByShareableUrl = async (shareableUrl: string) => {
  const { shareableUrl: url } = secretShareableUrlSchema.parse({ shareableUrl });

  try {
    const s = await db.query.secrets.findFirst({
      where: (t, { eq }) => eq(t.shareableUrl, url),
      with: {
        attachments: true,
        receivers: true,
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
