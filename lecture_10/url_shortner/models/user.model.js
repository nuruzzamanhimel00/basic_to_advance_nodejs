import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  foreignKey,
} from "drizzle-orm/pg-core";

export const usersModel = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }),

    email: varchar("email", { length: 255 })
      .notNull()
      .unique(),

    password: text("password").notNull(),

    role: varchar("role", { length: 50 })
      .default("user"),

    created_by: integer("created_by"),
    updated_by: integer("updated_by"),

    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updated_at: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    foreignKey({
      columns: [table.created_by],
      foreignColumns: [table.id],
      name: "users_created_by_fk",
    }),
    foreignKey({
      columns: [table.updated_by],
      foreignColumns: [table.id],
      name: "users_updated_by_fk",
    }),
  ]
);