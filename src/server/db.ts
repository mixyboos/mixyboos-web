import { env } from "@/env.mjs";
import * as appSchema from "@/db/schema";
import * as authSchema from "@/db/auth";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL cannot be found");
}
// for query purposes
const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, {
  schema: { ...appSchema, ...authSchema },
});
