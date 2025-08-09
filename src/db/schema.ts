import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const webpageScrapesTable = pgTable("webpage_scrapes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: varchar({ length: 2048 }).notNull(),
  markdownContent: text(),
  scrapedAt: timestamp().defaultNow().notNull(),
  freestyleSessionId: varchar({ length: 255 }),
  title: varchar({ length: 500 }),
  status: varchar({ length: 50 }).default('success'),
  errorMessage: text(),
  contentLength: integer(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});