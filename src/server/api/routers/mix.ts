import * as trpc from "@trpc/server";
import { mixes, users } from "@/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { desc } from "drizzle-orm";
import * as z from "zod";
import { mapMixToMixModel } from "@/lib/utils/mappers/mixMapper";

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
    .mutation(async ({ input: { title, description, tags }, ctx }) => {
      const userResult = await db
        .selectDistinct()
        .from(users)
        .where(eq(users.id, ctx.session.id));
      const user = userResult[0];
      if (!user) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "User is not authenticated.",
        });
      }
      const result = await db
        .insert(mixes)
        .values({ title, description, userId: ctx.session.id })
        .returning();

      return mapMixToMixModel(result[0], user);
    }),
});
