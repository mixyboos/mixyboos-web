import NextAuth, { AuthOptions } from 'next-auth';
import AuthService from '@lib/services/api/authService';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import Redis from 'ioredis';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import TokenPayload from '@lib/data/models/TokenPayload';

export const authOptions: AuthOptions = {
  session: {
    maxAge: 30 * 24 * 60 * 60, //30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        userName: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username or email address',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      authorize: async (credentials, _req): Promise<any> => {
        try {
          if (!credentials) {
            return false;
          }
          const authService = new AuthService();
          const token = await authService.getAuthToken(
            credentials.userName,
            credentials.password
          );
          if (!token) {
            return null;
          }

          const decodedToken = jwt_decode<JwtPayload & TokenPayload>(
            token.access_token
          );

          if (decodedToken) {
            const profile = {
              id: decodedToken.sub,
              name: decodedToken.name,
              email: decodedToken.name,
              image: decodedToken.image,
              slug: decodedToken.slug,
              accessToken: token.access_token,
              accessTokenExpires: token.expires_in,
            };

            const redisClient = new Redis(process.env.DATABASE_URL as string);
            await redisClient.set(
              decodedToken.sub as string,
              JSON.stringify(profile)
            );
            return profile;
          } else {
            return false;
          }
        } catch (err) {
          console.error('NEXT', 'authorize', err);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      // session.user.refreshToken = token.refreshToken;
      // session.user.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
