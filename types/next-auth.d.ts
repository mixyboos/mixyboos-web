import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    user: {
      id: string;
    };
  }

  interface User {
    // ...other properties
    // role: UserRole;
  }
}
