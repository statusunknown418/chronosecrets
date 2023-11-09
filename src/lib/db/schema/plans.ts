import { relations } from "drizzle-orm";
import { datetime, int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from ".";

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  productId: int("productId").notNull(),
  variantId: int("variantId").notNull().unique(),
  slug: varchar("slug", { length: 255 }),
  price: int("price").notNull(),
  tokens: int("tokens").notNull(),
});

export type Product = typeof products.$inferSelect;
export const createProductSchema = createInsertSchema(products);
export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const subscriptions = mysqlTable("subscriptions", {
  id: serial("id").primaryKey(),
  lemonSqueezyId: int("lemonSqueezyId").notNull().unique(),
  planId: int("planId").notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  startedAt: datetime("startedAt"),
  renewsAt: datetime("renewedAt"),
  canceledAt: datetime("canceledAt"),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  plan: one(products, {
    fields: [subscriptions.planId],
    references: [products.id],
  }),
}));
