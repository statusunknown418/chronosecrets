import { getPlaiceholder } from "plaiceholder";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { updateProfilePictureServer } from "../api/user/mutations";
import { getUserAuth } from "../auth/utils";

const f = createUploadthing();

export const ourFileRouter = {
  secretsAttachmentsUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
  })
    /**
     * Whatever is returned here is accessible in onUploadComplete as `metadata`
     */
    .middleware(async ({ req }) => {
      const { session } = await getUserAuth();

      if (!session?.user) throw new Error("Unauthorized");

      const buffer = await req.arrayBuffer();

      const { base64 } = await getPlaiceholder(Buffer.from(buffer));

      return { userId: session.user.id, blur: base64 };
    })
    .onUploadComplete(({ file, metadata }) => {
      /**
       * TODO: Maybe do something with this data later on
       */
    }),
  profilePictureUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const { session } = await getUserAuth();

      if (!session?.user) throw new Error("Unauthorized");

      return { userId: session.user.id, user: session.user };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      await updateProfilePictureServer(metadata.userId, file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
