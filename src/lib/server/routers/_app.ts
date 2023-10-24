import { router } from "../trpc";
import { friendshipsRouter } from "./friendships";
import { secretsRouter } from "./secrets";
import { transactionalRouter } from "./transactional";
import { userRouter } from "./user";

export const appRouter = router({
  secrets: secretsRouter,
  friendships: friendshipsRouter,
  user: userRouter,
  transactional: transactionalRouter,
});

export type AppRouter = typeof appRouter;
