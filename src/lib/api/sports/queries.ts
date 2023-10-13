import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { type SportId, sportIdSchema, sports } from "@/lib/db/schema/sports";

export const getSports = async () => {
  const s = await db.select().from(sports);
  return { sports: s };
};

export const getSportById = async (id: SportId) => {
  const { id: sportId } = sportIdSchema.parse({ id });
  const [s] = await db.select().from(sports).where(eq(sports.id, sportId));
  return { sport: s };
};

