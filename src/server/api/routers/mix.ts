import * as trpc from "@trpc/server";
import { mixes, users } from "@/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { slugifyWithCounter } from "@sindresorhus/slugify";
const slugify = slugifyWithCounter();

import { eq, sql } from "drizzle-orm";
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
      let slug;
      let checkSlugResult;
      do {
        slug = slugify(title, { decamelize: false, separator: "-" });
        checkSlugResult = await db
          .select({ count: sql<number>`count(*)`.mapWith(Number) })
          .from(mixes)
          .where(eq(mixes.slug, slug));
      } while (checkSlugResult[0]?.count !== 0);

      const result = await db
        .insert(mixes)
        .values({ title, slug, description, userId: ctx.session.id })
        .returning();

      return mapMixToMixModel(result[0], user);
    }),
});
