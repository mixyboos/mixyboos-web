import { type User as DbUser } from "@/db/schema";
import { type UserModel } from "@/lib/models";
import { type User as AuthUser } from "next-auth";
import mapImage from "./imageMapper";

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
        profileImage: mapImage(user.profileImage, "/img/default-avatar.png"),
        headerImage: mapImage(user.headerImage, "/img/default-header.png"),
        urls: [],
      }
    : undefined;

const mapDbAuthUserToUserModel = (user: DbUser): UserModel => ({
  id: user.id,
  username: user.username,
  name: user.name || user.username,
  email: user.email,
  bio: user.bio,
  profileImage: mapImage(user.profileImage, "/img/default-avatar.png"),
  headerImage: mapImage(user.profileImage, "/img/default-header.png"),
  urls: user.urls,
});

export { mapAuthUserToUserModel, mapDbAuthUserToUserModel };
