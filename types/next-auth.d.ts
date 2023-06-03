import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    user: User;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    bio: string;
    username: string;
  }
}
