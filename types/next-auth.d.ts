import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string;
      displayName?: string;
      slug?: string;
      email?: string;
      image?: string;
      accessToken: string;
    };
  }
  interface User {
    accessToken: string;
    accessTokenExpires: number;
    email: string;
    id: string;
    displayName: string;
    image: string;
    name: string;
    slug: string;
  }
}
