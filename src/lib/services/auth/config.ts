import { Session, type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import logger from "@/lib/logger";
import AuthService from "../api/auth-service";
import ProfileService from "../api/profile-service";

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

          const profile = await new ProfileService(
            token.accessToken,
          ).getProfile();
          if (!profile) {
            return null;
          }
          profile.auth = token;
          return {
            id: profile.id,
            name: profile?.username,
            email: profile.email,
            image: profile.profileImage,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            accessTokenExpires: token.expiresIn,
          };
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
      const profile = await new ProfileService(
        (token.token as string) || (token.accessToken as string),
      ).getProfile();
      const s: Session = {
        ...token,
        ...session,
        profile,
      };
      logger.debug("next-auth", "session", s);
      return s;
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
          name: user.name,
          email: user.email,
          token: user.accessToken,
          tokenExpires: user.accessTokenExpires,
        };
      }
      return token;
    },
  },
};

export default authOptions;
