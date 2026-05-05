import { pgTable, serial, varchar, integer, text } from "drizzle-orm/pg-core";
import {usersSchema} from "./user.model.js";

// Books Table
export const booksSchema = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  price: integer("price"),

  // ✅ Foreign key
  user_id: integer("user_id").references(() => usersSchema.id, {
    onDelete: "cascade", // optional
  }).notNull(),
});