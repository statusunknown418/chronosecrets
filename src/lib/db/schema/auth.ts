import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { secrets } from "./secrets";

export const users = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    username: varchar("username", { length: 255 }).unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: timestamp("emailVerified", {
      mode: "date",
      fsp: 3,
    }).defaultNow(),
    image: varchar("image", { length: 255 }),
  },
  (t) => ({
    nameIdx: index("name_idx").on(t.name),
  }),
);

/**
 * TODO: Friendships relations needs work
 */
export const usersRelations = relations(users, ({ many }) => ({
  secrets: many(secrets),
  receiving: many(usersToSecrets),
  friends: many(friendships, { relationName: "friends" }),
}));

export const usersToSecrets = mysqlTable(
  "users_to_secrets",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    secretId: int("secretId").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.secretId),
  }),
);

export const usersToSecretsRelations = relations(usersToSecrets, ({ one }) => ({
  receiver: one(users, {
    fields: [usersToSecrets.userId],
    references: [users.id],
  }),
  secret: one(secrets, {
    fields: [usersToSecrets.secretId],
    references: [secrets.id],
  }),
}));

export const friendships = mysqlTable(
  "friendship",
  {
    sourceId: varchar("user_id", { length: 255 }).notNull(),
    userId: varchar("friend_id", { length: 255 }).notNull(),
    requestAccepted: boolean("request_accepted").notNull().default(false),
  },
  (t) => ({
    pk: primaryKey(t.sourceId, t.userId),
  }),
);

export const friendshipSchema = createInsertSchema(friendships).omit({
  requestAccepted: true,
});
export type FriendshipSchema = z.infer<typeof friendshipSchema>;

export const friendshipsRelations = relations(friendships, ({ one }) => ({
  source: one(users, {
    fields: [friendships.sourceId],
    references: [users.id],
    relationName: "source",
  }),
  friends: one(users, {
    fields: [friendships.userId],
    references: [users.id],
    relationName: "friends",
  }),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => ({
    userIdIdx: index("userId_idx").on(t.userId),
  }),
);

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const updateUserSchema = createInsertSchema(users, {
  email: z.string().email().min(1),
  username: z
    .string()
    .min(5)
    .refine((s) => s.split("").filter((c) => c === ".").length === 0, {
      message: "The username can only contain letters, numbers and '_'",
    })
    .refine((s) => s.split("").filter((c) => c === "@").length < 1, {
      message: "Your username already contains the @ character by default",
    }),
}).omit({
  emailVerified: true,
  id: true,
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type FullUser = (typeof users)["$inferSelect"];
