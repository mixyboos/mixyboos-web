import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import * as z from "zod";

export const mixRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const mixes = ctx.prisma.mix.findMany({
      take: 10,
      orderBy: [{ createdAt: "desc" }],
    });
    return mixes;
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
