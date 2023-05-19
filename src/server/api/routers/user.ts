import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
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
