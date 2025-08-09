import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/postgres-js'

config({ path: ".env" }); // or .env.local

let _db: ReturnType<typeof drizzle> | null = null;

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    if (!_db) {
      if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL environment variable is required");
      }
      _db = drizzle(process.env.DATABASE_URL);
    }
    return _db[prop as keyof typeof _db];
  }
});