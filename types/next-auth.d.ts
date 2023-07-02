// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    user: User;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    name: string | null;
    bio: string | null;
    profileImage: string | null;
    headerImage: string | null;
    urls: string[] | undefined;
  }
}
