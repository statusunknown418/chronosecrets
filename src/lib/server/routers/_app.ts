import { router } from "../trpc";
import { sportsRouter } from "./sports";
import { secretsRouter } from "./secrets";

export const appRouter = router({
  sports: sportsRouter,
  secrets: secretsRouter,
});

export type AppRouter = typeof appRouter;
