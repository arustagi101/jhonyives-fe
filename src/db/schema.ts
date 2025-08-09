import { integer, pgTable, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const webpageScrapesTable = pgTable("webpage_scrapes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: varchar({ length: 2048 }).notNull(),
  domain: varchar({ length: 255 }).notNull(),
  htmlContent: text(),
  markdownContent: text(),
  scrapedAt: timestamp().defaultNow().notNull(),
  freestyleSessionId: varchar({ length: 255 }),
  repoId: varchar({ length: 255 }),
  devServerEphemeralUrl: varchar({ length: 512 }),
  devServerMcpUrl: varchar({ length: 512 }),
  devServerCodeUrl: varchar({ length: 512 }),
  devServerIsNew: boolean(),
  title: varchar({ length: 500 }),
  status: varchar({ length: 50 }).default('success'),
  errorMessage: text(),
  contentLength: integer(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});