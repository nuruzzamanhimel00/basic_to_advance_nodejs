import { pgTable, serial, varchar, integer, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  password:text().notNull(),
  // salt:text().notNull(),
});

export const userSession = pgTable("user_sessions", {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
        .references(() => usersTable.id)
        .notNull(),
    sessionToken: varchar("session_token", { length: 255 }).notNull(),
    createdAt: integer("created_at").notNull(),
}); 