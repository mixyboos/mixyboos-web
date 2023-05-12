import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { faker } from "@faker-js/faker";
import * as trpc from "@trpc/server";
import { hash } from "argon2";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input: { email, username, password }, ctx }) => {
      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }
      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          image: faker.image.avatar(),
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    const mixes = ctx.prisma.mix.findMany({
      take: 10,
      orderBy: [{ createdAt: "desc" }],
    });
    return mixes;
  }),
});
