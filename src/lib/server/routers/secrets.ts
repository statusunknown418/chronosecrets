import {
  createSecret,
  deleteSecret,
  updateSecret,
  viewSecretAsReceiver,
} from "@/lib/api/secrets/mutations";
import {
  getRevealedSecrets,
  getSecretById,
  getSecretByShareableUrl,
  getSecrets,
  getSecretsByReceiver,
} from "@/lib/api/secrets/queries";
import {
  insertSecretParams,
  secretIdSchema,
  updateSecretParams,
} from "@/lib/db/schema/secrets";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const secretsRouter = router({
  getSecrets: publicProcedure.input(z.string().optional()).query(({ input }) => {
    return getSecrets(input);
  }),
  getRevealedSecrets: publicProcedure.input(z.string().optional()).query(({ input }) => {
    return getRevealedSecrets(input);
  }),
  getSecretById: publicProcedure.input(secretIdSchema).query(({ input }) => {
    return getSecretById(input.id);
  }),
  getSecretsByReceiver: publicProcedure.query(() => {
    return getSecretsByReceiver();
  }),
  createSecret: publicProcedure.input(insertSecretParams).mutation(({ input }) => {
    return createSecret(input);
  }),
  updateSecret: publicProcedure
    .input(
      updateSecretParams.extend({
        cost: z.number(),
      }),
    )
    .mutation(({ input }) => {
      return updateSecret(input.id, input);
    }),
  deleteSecret: publicProcedure.input(secretIdSchema).mutation(({ input }) => {
    return deleteSecret(input.id);
  }),
  viewSecretAsReceiver: publicProcedure.input(secretIdSchema).mutation(({ input }) => {
    return viewSecretAsReceiver(input.id);
  }),
  getSecretByShareableLink: publicProcedure.input(z.string()).query(({ input }) => {
    return getSecretByShareableUrl(input);
  }),
});
