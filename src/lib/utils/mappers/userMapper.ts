import { type User as DbUser } from "@/db/schema";
import { type UserModel } from "@/lib/models";
import { type User as AuthUser } from "next-auth";

const mapAuthUserToUserModel = (
  user: AuthUser | undefined | null
): UserModel | undefined =>
  user
    ? {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
        headerImage: user.headerImage,
        urls: [],
      }
    : undefined;

const mapDbAuthUserToUserModel = (
  user: DbUser | undefined | null
): UserModel | undefined =>
  user
    ? {
        id: user.id as string,
        username: user.username ?? "unknownuser",
        name: (user.name as string) ?? (user.name as string) ?? "Unknown User",
        email: user.email as string,
        bio: user.bio as string,
        profileImage: (user.profileImage as string)
          ? `https://mixyboos.twic.pics/${user.profileImage}?twic=v1/resize=256`
          : "/img/default-avatar.png",
        headerImage: (user.headerImage as string)
          ? `https://mixyboos.twic.pics/${user.headerImage}?twic=v1/resize=1200x400`
          : "/img/default-header.png",
        urls: [],
      }
    : undefined;

export { mapAuthUserToUserModel, mapDbAuthUserToUserModel };
