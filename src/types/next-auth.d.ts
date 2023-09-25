import { type ProfileModel } from "@lib/data/models";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    user: User;
  }
  interface User {
    accessToken: string;
    accessTokenExpires: number;
    email: string;
    displayName: string;
    profileImage: string;
    name: string;
    slug: string;
    bio: string;
    profile: ProfileModel | undefined;
  }
}
