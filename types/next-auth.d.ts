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
    name: string | undefined;
    bio: string | undefined;
    profileImage: string | undefined;
    headerImage: string | undefined;
    urls: string[] | undefined;
  }
}
