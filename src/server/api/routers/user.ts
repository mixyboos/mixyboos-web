import { users } from "@/db/schema";
import { mapDbAuthUserToUserModel } from "@/lib/utils/mappers/userMapper";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import * as trpc from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getProfileForSettings: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.id;
    if (!userId) {
      throw new trpc.TRPCError({
        code: "FORBIDDEN",
      });
    }

    const results = await db
      .selectDistinct()
      .from(users)
      .where(eq(users.id, userId));
    const user = results[0];
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
      }),
    )
    .query(async ({ input: { streamKey } }) => {
      const results = await db
        .selectDistinct()
        .from(users)
        .where(eq(users.streamKey, streamKey));
      const user = results[0];

      return user;
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        bio: z.string().nullable(),
        urls: z.array(z.string()),
        profileImage: z.string().nullable(),
        headerImage: z.string().nullable(),
      }),
    )
    .mutation(
      async ({
        input: { username, email, bio, urls, profileImage, headerImage },
        ctx,
      }) => {
        const results = await db
          .selectDistinct()
          .from(users)
          .where(eq(users.id, ctx.session.id));
        const user = results[0];

        if (!user) {
          throw new trpc.TRPCError({
            code: "FORBIDDEN",
            message: "User is not authenticated.",
          });
        }
        await db
          .update(users)
          .set({
            ...user,
            username,
            email,
            bio,
            urls,
            profileImage,
            headerImage,
          })
          .where(eq(users.id, ctx.session.id));
      },
    ),
});
