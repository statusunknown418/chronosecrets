import { db } from "@/lib/db";
import { secrets } from "@/lib/db/schema";
import { defer } from "@defer/client";
import { inArray } from "drizzle-orm";

const checkSecrets = async () => {
  console.log(new Date());

  const s = await db.query.secrets.findMany({
    where: (t, { eq, or, lte }) =>
      or(lte(t.revealingDate, new Date()), eq(t.revealingDate, new Date())),
  });

  const ids = s.map((s) => s.id);

  await db.update(secrets).set({ revealed: true }).where(inArray(secrets.id, ids));
};

export default defer.cron(checkSecrets, "0 * * * *");
