import {
  boolean,
  datetime,
  index,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
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
    content: text("content").notNull(),
    revealingDate: datetime("revealing_date", { mode: "date" }).notNull(),
    revealed: boolean("revealed"),
    encryptionType: mysqlEnum("encryption_type", ["SHA256", "DES", "RSA", "AES"]).default(
      "RSA",
    ),
    editedAt: datetime("edited_at", { mode: "date" }),
    createdAt: datetime("created_at", { mode: "date" }),
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
  revealingDate: z
    .date({
      required_error: "Revealing date is required",
      invalid_type_error: "Revealing date must be a date",
    })
    .min(new Date(), {
      message: "Revealing date must be in the future",
    }),
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character long",
    })
    .max(256),
  content: z.string().min(3, {
    message: "Content must be longer (3 characters at least)",
  }),
  createdAt: z.date().optional(),
})
  .omit({
    id: true,
    createdByUserId: true,
    shareableUrl: true,
    wasEdited: true,
    editedAt: true,
  })
  .refine((schema) => {
    return schema.revealingDate > new Date();
  });

export const updateSecretSchema = createSelectSchema(secrets).omit({
  createdByUserId: true,
  createdAt: true,
});

export const updateSecretParams = createSelectSchema(secrets, {
  revealed: z.coerce.boolean(),
}).omit({
  createdByUserId: true,
  createdAt: true,
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
