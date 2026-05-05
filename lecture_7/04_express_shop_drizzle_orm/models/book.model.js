import { pgTable, serial, varchar, integer, text, index } from "drizzle-orm/pg-core";
import {usersSchema} from "./user.model.js";
import { sql } from "drizzle-orm";

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

},

(table) => {
  return {
    searchIndexOnTitle: index("title_index").using("gin", sql`to_tsvector('english', ${table.title})`), // ✅ index on title
  
  };
}
);