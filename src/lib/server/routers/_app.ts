import { router } from "../trpc";
import { friendshipsRouter } from "./friendships";
import { secretsRouter } from "./secrets";
import { sportsRouter } from "./sports";
import { userRouter } from "./user";

export const appRouter = router({
  sports: sportsRouter,
  secrets: secretsRouter,
  friendships: friendshipsRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
