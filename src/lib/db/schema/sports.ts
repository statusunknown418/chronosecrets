import {
  boolean,
  datetime,
  index,
  int,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getSports } from "@/lib/api/sports/queries";

export const sports = mysqlTable(
  "sports",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }),
    membersAllowed: int("members_allowed"),
    isActive: boolean("is_active"),
    availableDate: datetime("available_date", {
      mode: "date",
    }),
  },
  (t) => ({
    titleIdx: index("title_idx").on(t.title),
  })
);

// Schema for sports - used to validate API requests
export const insertSportSchema = createInsertSchema(sports);

export const insertSportParams = createSelectSchema(sports, {
  membersAllowed: z.coerce.number().default(1),
  isActive: z.coerce.boolean().default(true),
  availableDate: z.coerce.date().nullable(),
  description: z.coerce.string().default(""),
}).omit({
  id: true,
});

export const updateSportSchema = createSelectSchema(sports);

export const updateSportParams = createSelectSchema(sports, {
  membersAllowed: z.coerce.number(),
  isActive: z.coerce.boolean(),
  availableDate: z.coerce.date().nullable(),
});

export const sportIdSchema = updateSportSchema.pick({ id: true });

// Types for sports - used to type API request params and within Components
export type Sport = z.infer<typeof updateSportSchema>;
export type NewSport = z.infer<typeof insertSportSchema>;
export type NewSportParams = z.infer<typeof insertSportParams>;
export type UpdateSportParams = z.infer<typeof updateSportParams>;
export type SportId = z.infer<typeof sportIdSchema>["id"];

// this type infers the return from getSports() - meaning it will include any joins
export type CompleteSport = Awaited<
  ReturnType<typeof getSports>
>["sports"][number];
