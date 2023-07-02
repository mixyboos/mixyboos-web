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

const mapDbAuthUserToUserModel = (user: DbUser): UserModel => ({
  id: user.id,
  username: user.username,
  name: user.name,
  email: user.email,
  bio: user.bio,
  profileImage: user.profileImage
    ? `https://mixyboos.twic.pics/${user.profileImage}?twic=v1/resize=256`
    : "/img/default-avatar.png",
  headerImage: user.headerImage
    ? `https://mixyboos.twic.pics/${user.headerImage}?twic=v1/resize=1200x400`
    : "/img/default-header.png",
  urls: user.urls,
});

export { mapAuthUserToUserModel, mapDbAuthUserToUserModel };
