import { type UserModel } from "@/lib/models";
import { type User as DbUser } from "@prisma/client";
import { type User as AuthUser } from "next-auth";

const mapAuthUserToUserModel = (
  user: AuthUser | undefined | null
): UserModel | undefined =>
  user
    ? {
        username: user.username,
        name: user.name,
        bio: user.bio,
        image: user.image,
      }
    : undefined;

const mapDbAuthUserToUserModel = (
  user: DbUser | undefined | null
): UserModel | undefined =>
  user
    ? {
        username: user.username ?? "unknownuser",
        name: user.name ?? "Unknown User",
        bio: user.bio,
        image: user.image,
      }
    : undefined;

export { mapAuthUserToUserModel, mapDbAuthUserToUserModel };
