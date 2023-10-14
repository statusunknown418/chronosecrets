import { createSport, deleteSport, updateSport } from "@/lib/api/sports/mutations";
import { getSportById, getSports } from "@/lib/api/sports/queries";
import {
  insertSportParams,
  sportIdSchema,
  updateSportParams,
} from "@/lib/db/schema/sports";
import { publicProcedure, router } from "../trpc";

export const sportsRouter = router({
  getSports: publicProcedure.query(async () => {
    return getSports();
  }),
  getSportById: publicProcedure.input(sportIdSchema).query(async ({ input }) => {
    return getSportById(input.id);
  }),
  createSport: publicProcedure.input(insertSportParams).mutation(async ({ input }) => {
    return createSport(input);
  }),
  updateSport: publicProcedure.input(updateSportParams).mutation(async ({ input }) => {
    return updateSport(input.id, input);
  }),
  deleteSport: publicProcedure.input(sportIdSchema).mutation(async ({ input }) => {
    return deleteSport(input.id);
  }),
});
