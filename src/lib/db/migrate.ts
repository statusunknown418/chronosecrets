import { env } from "@/lib/env.mjs";

import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";

const runMigrate = async () => {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const connection = connect({ url: env.DATABASE_URL });

  const db = drizzle(connection);

  const start = Date.now();

  await migrate(db, { migrationsFolder: "src/lib/db/migrations" });

  const end = Date.now();

  // eslint-disable-next-line no-console
  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
