import { env } from "@/env.mjs";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL cannot be found");
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const pool = new Pool({
  connectionString: env.DATABASE_URL,
} as PoolConfig);

export const db = drizzle(pool);
