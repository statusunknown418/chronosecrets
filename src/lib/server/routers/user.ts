import { checkUsernameAvailable, updateUser } from "@/lib/api/user/mutations";
import { findUserByUsernameOrEmail } from "@/lib/api/user/queries";
import { getFullUser, getUserAuth } from "@/lib/auth/utils";
import { updateUserSchema } from "@/lib/db/schema";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  updateUser: publicProcedure.input(updateUserSchema).mutation(async ({ input }) => {
    const { session } = await getUserAuth();
    return updateUser(session?.user.id!, input);
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
});
