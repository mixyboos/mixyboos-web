import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const mixRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const mixes = ctx.prisma.mix.findMany({
      take: 10,
      orderBy: [{ createdAt: "desc" }],
    });
    return mixes;
  }),
});
