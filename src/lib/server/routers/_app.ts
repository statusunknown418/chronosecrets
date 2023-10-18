import { router } from "../trpc";
import { friendshipsRouter } from "./friendships";
import { secretsRouter } from "./secrets";
import { userRouter } from "./user";

export const appRouter = router({
  secrets: secretsRouter,
  friendships: friendshipsRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
