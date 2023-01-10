import { UserModel } from '@lib/data/models';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
  interface User {
    accessToken: string;
    accessTokenExpires: number;
    email: string;
    id: string;
    displayName: string;
    profileImage: string;
    name: string;
    slug: string;
    profile: UserModel;
  }
}
