import { generateSecretKey } from "@/lib/utils/crypt";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
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
  getStreamKey: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.id;
    if (!userId) return undefined;

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return undefined;

    if (!user.streamKey) {
      const key = generateSecretKey();
      if (key) {
        user.streamKey = key;
        await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            ...user,
          },
        });
      } else {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to generate secret key for user.",
        });
      }
    }
    return user.streamKey;
  }),
});
