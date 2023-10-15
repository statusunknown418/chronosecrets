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
import { secrets } from "./secrets";

export const users = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    username: varchar("username", { length: 255 }).unique(),
    email: varchar("email", { length: 255 }).notNull(),
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
    userId: varchar("user_id", { length: 255 }).notNull(),
    friendId: varchar("friend_id", { length: 255 }).notNull(),
    requestAccepted: boolean("request_accepted").notNull().default(false),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.friendId),
  }),
);

export const friendshipsRelations = relations(friendships, ({ one }) => ({
  follows: one(users, {
    fields: [friendships.userId],
    references: [users.id],
    relationName: "friends",
  }),
  followed: one(users, {
    fields: [friendships.friendId],
    references: [users.id],
    relationName: "followed",
  }),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 1200 }),
    access_token: varchar("access_token", { length: 1200 }),
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
