import { type ProfileModel } from "@lib/data/models";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    accessToken: string;
    accessTokenExpires: number;
  }
  interface Session {
    id: string;
    email: string;
    token: string;
    user: User;
    profile: ProfileModel;
  }
}
