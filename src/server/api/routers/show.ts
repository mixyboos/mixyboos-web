import * as trpc from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import { type LiveShowModel } from "@/lib/models";
import {
  mapNoShowToShowModel,
  mapShowToShowModel,
} from "@/lib/utils/mappers/showMappers";
import { db } from "@/server/db";
import { liveShows, tags as showTags } from "@/db/schema";
import { eq, or, and, inArray } from "drizzle-orm";

export const showRouter = createTRPCRouter({
  startShow: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
      })
    )
    .mutation(async ({ input: { title, description, tags }, ctx }) => {
      const userId = ctx.session.id;
      if (!userId)
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "User is not authenticated.",
        });
      const result = await db
        .selectDistinct()
        .from(liveShows)
        .where(
          and(
            eq(liveShows.userId, userId),
            or(eq(liveShows.status, "SETUP"), eq(liveShows.status, "AWAITING"))
          )
        );
      const inProgressShow = result[0];
      if (inProgressShow)
        throw new trpc.TRPCError({
          code: "PRECONDITION_FAILED",
          message: "User already has show in progress.",
        });

      tags.forEach((element) => {
        async () => {
          await db.insert(showTags).values({ title }).onConflictDoNothing();
        };
      });

      const insertResult = await db
        .insert(liveShows)
        .values({
          userId,
          title,
          description,
          status: "AWAITING",
        })
        .returning();
      const show = insertResult[0];
      if (show) {
        return mapShowToShowModel(show, ctx.session.user);
      }
    }),
  getInProgress: protectedProcedure.query(
    async ({ ctx }): Promise<LiveShowModel> => {
      if (!ctx.session) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "GTFO!",
        });
      }
      const userId = ctx.session.id;
      const results = await db
        .selectDistinct()
        .from(liveShows)
        .where(
          and(
            eq(liveShows.userId, userId),
            inArray(liveShows.status, ["SETUP", "AWAITING", "STREAMING"])
          )
        );
      const show = results[0];

      if (!show) {
        return mapNoShowToShowModel(ctx.session.user);
      }
      return mapShowToShowModel(show, ctx.session.user);
    }
  ),
  checkForStart: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId }, ctx }) => {
      const results = await db
        .selectDistinct()
        .from(liveShows)
        .where(
          and(
            eq(liveShows.userId, userId),
            inArray(liveShows.status, ["AWAITING", "STREAMING"])
          )
        );
      const show = results[0];
      return show ? mapShowToShowModel(show, undefined) : null;
    }),
  checkForInProgress: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId }, ctx }) => {
      const results = await db
        .selectDistinct()
        .from(liveShows)
        .where(
          and(
            eq(liveShows.userId, userId),
            inArray(liveShows.status, ["STREAMING"])
          )
        );
      const show = results[0];
      return show ? mapShowToShowModel(show, undefined) : null;
    }),
});
