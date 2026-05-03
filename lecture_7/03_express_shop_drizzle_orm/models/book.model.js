import { pgTable, serial, varchar, integer, text } from "drizzle-orm/pg-core";
import { usersSchema } from "./user.model.js";

export const bookSchema = pgTable("books", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => usersSchema.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
});