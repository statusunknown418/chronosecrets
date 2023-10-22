import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { updateProfilePictureServer } from "../api/user/mutations";
import { getUserAuth } from "../auth/utils";

const f = createUploadthing();

export const ourFileRouter = {
  secretsAttachmentsUploader: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "8MB" },
  })
    .input(
      z.object({
        secretId: z.string(),
      }),
    )
    .middleware(async ({ input: { secretId } }) => {
      const { session } = await getUserAuth();

      // If you throw, the user will not be able to upload
      if (!session?.user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id, secretId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
  profilePictureUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const { session } = await getUserAuth();

      // If you throw, the user will not be able to upload
      if (!session?.user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id, user: session.user };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      await updateProfilePictureServer(metadata.userId, file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
