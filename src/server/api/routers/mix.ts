import { mixes } from "@/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { db } from "@/server/db";
import { desc } from "drizzle-orm";
import * as z from "zod";

export const mixRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const results = db
      .select()
      .from(mixes)
      .orderBy(desc(mixes.createdAt))
      .limit(10);

    return results;
  }),
  createMix: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input: { title, description, tags }, ctx }) => {}),
});
