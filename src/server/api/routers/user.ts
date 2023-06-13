import {
  mapAuthUserToUserModel,
  mapDbAuthUserToUserModel,
} from "@/lib/utils/mappers/userMapper";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import * as trpc from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getProfileForSettings: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.id;
    if (!userId) {
      throw new trpc.TRPCError({
        code: "FORBIDDEN",
      });
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new trpc.TRPCError({
        code: "UNAUTHORIZED",
      });
    }
    return mapDbAuthUserToUserModel(user);
  }),

  getByStreamKey: publicProcedure
    .input(
      z.object({
        streamKey: z.string(),
      })
    )
    .query(async ({ input: { streamKey }, ctx }) => {
      const user = ctx.prisma.user.findUnique({
        where: {
          streamKey: streamKey,
        },
      });

      return user;
    }),
});
