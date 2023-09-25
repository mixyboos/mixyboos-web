import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode, { type JwtPayload } from "jwt-decode";
import logger from "@/lib/logger";
import AuthService from "../api/auth-service";
import { type TokenPayload } from "@/lib/models";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
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

          const profile = await new AuthService(token.accessToken).getProfile();
          if (!profile) {
            return null;
          }
          profile.auth = token;
          return profile;
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
      return token;
    },
    jwt: async ({ user, token, account, profile }) => {
      /*
        This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
        The returned value will be encrypted, and it is stored in a cookie.

        Persist the OAuth access_token and or the user id to the token right after signin

        The arguments user, account, profile and isNewUser are only passed the first time this callback is called on a new session,
        after the user signs in. In subsequent calls, only token will be available
      */
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },
  },
};

export default authOptions;
