import { checkUsernameAvailable, updateUser } from "@/lib/api/user/mutations";
import { findUserByUsernameOrEmail, getSafeUserById } from "@/lib/api/user/queries";
import { getFullUser } from "@/lib/auth/utils";
import { updateUserSchema } from "@/lib/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  updateUser: publicProcedure.input(updateUserSchema).mutation(async ({ input }) => {
    const user = await getFullUser();

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to do that.",
      });
    }

    return updateUser(user.id, input);
  }),
  getFullViewer: publicProcedure.query(() => {
    return getFullUser();
  }),
  checkUsername: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return checkUsernameAvailable(input);
  }),
  getByUsernameOrEmail: publicProcedure.input(z.string()).query(async ({ input }) => {
    return findUserByUsernameOrEmail(input);
  }),
  getSafeUserById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return getSafeUserById(input);
  }),
});
