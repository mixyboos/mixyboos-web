import { mixes, users } from "@/db/schema";
import { generateSecretKey } from "@/lib/utils/crypt";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { faker } from "@faker-js/faker";
import * as trpc from "@trpc/server";
import { hash } from "argon2";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input: { email, username, password }, ctx }) => {
      const exists = await ctx.db
        .selectDistinct()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (exists.length !== 0) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }
      const hashedPassword = await hash(password);

      const result = await ctx.db
        .insert(users)
        .values({
          username: username,
          email,
          password: hashedPassword,
          profileImage: faker.image.avatar(),
        })
        .returning();
      if (!result[0]?.id) {
        return {
          status: 500,
          message: "Unable to create account",
        };
      }
      return {
        status: 201,
        message: "Account created successfully",
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    const results = ctx.db
      .select()
      .from(mixes)
      .limit(10)
      .orderBy(desc(mixes.createdAt));
    return results;
  }),
  getStreamKey: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.id;
    if (!userId) return undefined;

    const result = await ctx.db
      .selectDistinct()
      .from(users)
      .where(eq(users.id, userId));

    if (!result || result.length === 0) return undefined;
    const user = result[0];

    if (!user) return;
    if (!user?.streamKey) {
      const key = generateSecretKey();
      if (key) {
        user.streamKey = key;
        await ctx.db
          .update(users)
          .set({ ...user })
          .where(eq(users.id, userId));
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
