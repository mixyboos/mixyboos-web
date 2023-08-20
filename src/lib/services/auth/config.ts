import { type AuthTokenModel } from "@/lib/models";
import type { Session, AuthOptions } from "next-auth";
import AuthService from "../api/auth-service";
import jwt_decode, { type JwtPayload } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import ProfileService from "../api/profile-service";
import { type JWT } from "next-auth/jwt";
import logger from "@/lib/logger";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    maxAge: 30 * 24 * 60 * 60, //30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    signOut: "/",
  },
  providers: [
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
            return null;
          }
          const token = await new AuthService().getAuthToken(
            credentials.username,
            credentials.password,
          );

          if (!token) {
            return null;
          }

          const decodedToken = jwt_decode<JwtPayload & AuthTokenModel>(
            token.access_token,
          );

          if (decodedToken && decodedToken.sub) {
            // const session: Session = {
            //   id: decodedToken.sub as string,
            //   accessToken: token.access_token,
            //   expires: `${token.expires_in}`,
            //   user: {
            //     id: decodedToken.id,
            //     email: decodedToken.email,
            //     username: decodedToken.name,
            //     name: decodedToken.displayName,
            //     slug: decodedToken.slug,
            //     profileImage: decodedToken.profileImage,
            //     accessToken: token.access_token,
            //   },
            // };
            const r = {
              id: decodedToken.id,
              email: decodedToken.email,
              username: decodedToken.name,
              name: decodedToken.displayName,
              slug: decodedToken.slug,
              profileImage: decodedToken.profileImage,
              accessToken: token.access_token,
            };
            logger.debug("config", "authorize_returns", r);
            return Promise.resolve(r);
          }
        } catch (err) {
          logger.error(`Error authorizing: ${err}`);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      const profile = await new ProfileService(
        session.accessToken,
      ).getProfile();
      if (!profile) {
        return Promise.resolve(session);
      }
      session.user.profile = profile;
      logger.debug("config", "callback_session_Returns", session);
      return session;
    },
    jwt: async ({ user, token }): Promise<JWT> => {
      if (user) {
        token.user = user;
      }
      logger.debug("config", "callback_jwt_Returns", token);
      return Promise.resolve(token);
    },
  },
};
