import { relations } from "drizzle-orm";
import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { secrets } from "./secrets";

export const attachments = mysqlTable("attachments", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 256 }).notNull(),
  secretId: int("secret_id"),
});

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  secret: one(secrets, {
    fields: [attachments.secretId],
    references: [secrets.id],
  }),
}));
