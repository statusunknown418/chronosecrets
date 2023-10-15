import { db } from "@/lib/db";
import {
  NewSportParams,
  SportId,
  UpdateSportParams,
  insertSportSchema,
  sportIdSchema,
  sports,
  updateSportSchema,
} from "@/lib/db/schema/sports";
import { eq } from "drizzle-orm";

export const createSport = async (sport: NewSportParams) => {
  const newSport = insertSportSchema.parse(sport);
  try {
    await db.insert(sports).values(newSport);
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    return { error: message };
  }
};

export const updateSport = async (id: SportId, sport: UpdateSportParams) => {
  const { id: sportId } = sportIdSchema.parse({ id });
  const newSport = updateSportSchema.parse(sport);
  try {
    await db.update(sports).set(newSport).where(eq(sports.id, sportId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    return { error: message };
  }
};

export const deleteSport = async (id: SportId) => {
  const { id: sportId } = sportIdSchema.parse({ id });
  try {
    await db.delete(sports).where(eq(sports.id, sportId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    return { error: message };
  }
};
