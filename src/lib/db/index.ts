import { env } from "@/lib/env.mjs";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as schema from "./schema";

// create the connection
export const connection = connect({
  host: env.DATABASE_HOST,
  password: env.DATABASE_PASSWORD,
  username: env.DATABASE_USERNAME,
});

export const db = drizzle(connection, { schema });
