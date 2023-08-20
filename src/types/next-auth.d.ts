// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession } from "next-auth";
import type { UserModel } from "@/lib/models";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    accessToken: string;
    user: User & DefaultSession["user"];
  }

  interface User {
    username: string;
    slug: string;
    email: string;
    name: string | null;
    profileImage: string | null;
    profile?: UserModel;
  }
}
