import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode, { type JwtPayload } from "jwt-decode";
import logger from "@/lib/logger";
import AuthService from "../api/auth-service";
import { TokenPayload } from "@/lib/models";

export const authOptions: AuthOptions = {
  session: {
    maxAge: 30 * 24 * 60 * 60, //30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username or email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials, _req): Promise<any> => {
        logger.info({ authorize: "Authorizing" });
        try {
          if (!credentials) {
            return false;
          }
          const token = await new AuthService().getAuthToken(
            credentials.username,
            credentials.password,
          );

          if (!token) {
            return null;
          }
          const decodedToken = jwt_decode<JwtPayload & TokenPayload>(
            token.access_token,
          );

          if (decodedToken) {
            const profile = {
              id: decodedToken.sub,
              name: decodedToken.name,
              displayName: decodedToken.displayName,
              email: decodedToken.email,
              profileImage: decodedToken.profileImage,
              slug: decodedToken.slug,
              accessToken: token.access_token,
              accessTokenExpires: token.expires_in,
            };

            return profile;
          } else {
            return false;
          }
        } catch (err) {
          logger.error(`Error authorizing: ${err}`);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account && account.provider === "google") {
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      session.id = token.sub as string;
      session.user.accessToken = token.accessToken as string;
      session.user.displayName = token.displayName as string;
      session.user.profileImage = token.profileImage as string;
      session.user.slug = token.slug as string;

      if (session.user.accessToken) {
        const authService = new AuthService(session.user.accessToken);
        const profile = await authService.getUser();
        session.user.profile = profile;
      }
      // session.user.refreshToken = token.refreshToken;
      // session.user.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          displayName: user.displayName,
          profileImage: user.profileImage,
          slug: user.slug,
        };
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
