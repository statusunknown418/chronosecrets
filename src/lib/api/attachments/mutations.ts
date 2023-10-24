import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { attachments } from "@/lib/db/schema";
import { TRPCError } from "@trpc/server";

export const linkAttachmentToSecret = async (
  secretId: number,
  attachmentUrls: string[],
) => {
  try {
    const { session } = await getUserAuth();

    if (!session?.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to do this",
      });
    }

    if (attachmentUrls.length === 0) {
      return { success: true, message: "no attachments provided, skipping..." };
    }

    const allFiles = attachmentUrls.map((url) => ({
      secretId,
      url,
    }));

    return await db.insert(attachments).values(allFiles);
  } catch (error) {
    return { error };
  }
};
