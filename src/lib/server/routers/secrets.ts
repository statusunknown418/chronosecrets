import { createSecret, deleteSecret, updateSecret } from "@/lib/api/secrets/mutations";
import { getSecretById, getSecrets } from "@/lib/api/secrets/queries";
import {
  insertSecretParams,
  secretIdSchema,
  updateSecretParams,
} from "@/lib/db/schema/secrets";
import { publicProcedure, router } from "../trpc";

export const secretsRouter = router({
  getSecrets: publicProcedure.query(() => {
    return getSecrets();
  }),
  getSecretById: publicProcedure.input(secretIdSchema).query(({ input }) => {
    return getSecretById(input.id);
  }),
  createSecret: publicProcedure.input(insertSecretParams).mutation(({ input }) => {
    return createSecret(input);
  }),
  updateSecret: publicProcedure.input(updateSecretParams).mutation(({ input }) => {
    return updateSecret(input.id, input);
  }),
  deleteSecret: publicProcedure.input(secretIdSchema).mutation(({ input }) => {
    return deleteSecret(input.id);
  }),
});
