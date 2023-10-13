import {
  boolean,
  datetime,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getSecrets } from "@/lib/api/secrets/queries";

export const secrets = mysqlTable("secrets", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  content: varchar("content", { length: 256 }),
  revealingDate: datetime("revealing_date", { mode: "date" }).notNull(),
  createdAt: datetime("created_at", { mode: "date" }),
  editedAt: datetime("edited_at", { mode: "date" }),
  revealed: boolean("revealed"),
  createdByUserId: varchar("user_id", { length: 256 }).notNull(),
  receiverId: varchar("receiver_id", { length: 256 }).notNull(),
});

// Schema for secrets - used to validate API requests
export const insertSecretSchema = createInsertSchema(secrets);

export const insertSecretParams = createSelectSchema(secrets, {
  editedAt: z.coerce.string(),
  revealed: z.coerce.boolean(),
}).omit({
  id: true,
  createdByUserId: true,
});

export const updateSecretSchema = createSelectSchema(secrets);

export const updateSecretParams = createSelectSchema(secrets, {
  revealed: z.coerce.boolean(),
}).omit({
  createdByUserId: true,
});

export const secretIdSchema = updateSecretSchema.pick({ id: true });

// Types for secrets - used to type API request params and within Components
export type Secret = z.infer<typeof updateSecretSchema>;
export type NewSecret = z.infer<typeof insertSecretSchema>;
export type NewSecretParams = z.infer<typeof insertSecretParams>;
export type UpdateSecretParams = z.infer<typeof updateSecretParams>;
export type SecretId = z.infer<typeof secretIdSchema>["id"];

// this type infers the return from getSecrets() - meaning it will include any joins
export type CompleteSecret = Awaited<
  ReturnType<typeof getSecrets>
>["secrets"][number];
