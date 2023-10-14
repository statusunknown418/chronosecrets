import {
  boolean,
  datetime,
  index,
  mysqlEnum,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getSecrets } from "@/lib/api/secrets/queries";
import { relations } from "drizzle-orm";
import { users, usersToSecrets } from ".";
import { attachments } from "./attachments";

export const secrets = mysqlTable(
  "secrets",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    shareableUrl: varchar("shareable_url", { length: 256 }).notNull().unique(),
    content: varchar("content", { length: 256 }),
    revealingDate: datetime("revealing_date", { mode: "date" }).notNull(),
    createdAt: datetime("created_at", { mode: "date" }),
    revealed: boolean("revealed"),
    encryptionType: mysqlEnum("encryption_type", ["SHA256", "DES", "RSA", "AES"]).default(
      "RSA",
    ),
    editedAt: datetime("edited_at", { mode: "date" }),
    wasEdited: boolean("was_edited").default(false),
    createdByUserId: varchar("created_by_user_id", { length: 256 }).notNull(),
  },
  (t) => ({
    revealedIdx: index("revealed_idx").on(t.revealed),
  }),
);

export const secretsRelations = relations(secrets, ({ one, many }) => ({
  creator: one(users, {
    fields: [secrets.createdByUserId],
    references: [users.id],
  }),
  receivers: many(usersToSecrets),
  attachments: many(attachments),
}));

// Schema for secrets - used to validate API requests
export const insertSecretSchema = createInsertSchema(secrets);

export const insertSecretParams = createSelectSchema(secrets, {
  revealed: z.coerce.boolean(),
}).omit({
  id: true,
  createdByUserId: true,
  shareableUrl: true,
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
export type CompleteSecret = Awaited<ReturnType<typeof getSecrets>>["secrets"][number];
