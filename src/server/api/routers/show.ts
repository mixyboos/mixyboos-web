import * as trpc from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import { type LiveShowModel, mapShowStatusFromDb } from "@/lib/models";

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
      const inProgressShow = await ctx.prisma.liveShow.findFirst({
        where: {
          status: { in: ["SETUP", "AWAITING"] },
          userId: userId,
        },
      });
      if (inProgressShow)
        throw new trpc.TRPCError({
          code: "PRECONDITION_FAILED",
          message: "User already has show in progress.",
        });

      tags.forEach((element) => {
        async () => {
          await ctx.prisma.tag.upsert({
            create: {
              title,
            },
            update: {},
            where: {
              title: element,
            },
          });
        };
      });

      const tagsToAdd = await ctx.prisma.tag.findMany({
        where: {
          title: { in: tags },
        },
      });
      const show = await ctx.prisma.liveShow.create({
        data: {
          userId,
          title,
          description,
          tags: {
            connect: tagsToAdd,
          },
        },
      });

      return show;
    }),
  getInProgress: protectedProcedure.query(
    async ({ ctx }): Promise<LiveShowModel | undefined> => {
      if (!ctx.session) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "No session available.",
        });
      }
      const userId = ctx.session.id;
      const show = await ctx.prisma.liveShow.findFirst({
        where: {
          status: { in: ["SETUP", "AWAITING"] },
          userId: userId,
        },
      });
      if (!show) {
        return undefined;
      }
      return {
        ...show,
        tags: ["House"],
        status: mapShowStatusFromDb(show.status),
        user: {
          slug: ctx.session.user.slug,
          displayName: ctx.session.user.name,
          biography: ctx.session.user.bio,
          profileImage: ctx.session.user.image,
        },
      };
    }
  ),
  checkForStart: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId }, ctx }) => {
      const show = await ctx.prisma.liveShow.findFirst({
        where: {
          status: { in: ["STREAMING"] },
          userId: userId,
        },
      });
      return show;
    }),
});
