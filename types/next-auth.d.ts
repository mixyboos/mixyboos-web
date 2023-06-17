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
    name: string;
    bio: string;
    email: string;
    profileImage: string;
    headerImage: string;
  }
}
