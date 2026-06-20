import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  foreignKey,
} from "drizzle-orm/pg-core";
import { usersModel } from "./user.model.js";

export const shortUrlsModel = pgTable(
  "short_urls",
  {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => usersModel.id).notNull(),
    original_url: text("original_url").notNull(),

    short_code: varchar("short_code", { length: 10 }).notNull().unique(),

    created_by: integer("created_by").references(() => usersModel.id),

    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }
);

   