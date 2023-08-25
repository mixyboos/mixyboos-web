import { type User as DbUser } from "@/db/schema";
import { type ProfileModel } from "@/lib/models";
import { type User as AuthUser } from "next-auth";
import mapImage from "./imageMapper";

const mapAuthUserToUserModel = (
  user: AuthUser | undefined | null
): ProfileModel | undefined =>
  user
    ? {
        id: user.id,
        username: user.username,
        displayName: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: mapImage(user.profileImage, "/img/default-avatar.png"),
        headerImage: mapImage(user.headerImage, "/img/default-header.png"),
        urls: [],
      }
    : undefined;

const mapDbAuthUserToUserModel = (user: DbUser): ProfileModel => ({
  id: user.id,
  username: user.username,
  displayName: user.name || user.username,
  email: user.email,
  bio: user.bio,
  profileImage: mapImage(user.profileImage, "/img/default-avatar.png"),
  headerImage: mapImage(user.profileImage, "/img/default-header.png"),
  urls: user.urls,
});

export { mapAuthUserToUserModel, mapDbAuthUserToUserModel };
