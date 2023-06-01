import { type UserModel } from "@/lib/models";
import { type User } from "next-auth";

const mapUserToUserModel = (user: User | undefined): UserModel | undefined =>
  user
    ? {
        slug: user.slug,
        displayName: user.name,
        biography: user.bio,
        profileImage: user.image,
      }
    : undefined;

export { mapUserToUserModel };
