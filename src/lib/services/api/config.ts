import logger from "@/lib/logger";
import { type AuthOptions } from "next-auth";
import jwt_decode, { type JwtPayload } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthService from "./auth-service";
import { type AuthTokenModel } from "@/lib/models";
import AspNetIdentityAdapter from "../auth/asp-net-identity-adapter";

export const authOptions: AuthOptions = {
  adapter: AspNetIdentityAdapter(process.env.NEXT_PUBLIC_API_URL as string),
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        userName: {
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
          const authService = new AuthService();
          const token = await authService.getAuthToken(
            credentials.userName,
            credentials.password,
          );

          if (!token) {
            return null;
          }
          const decodedToken = jwt_decode<JwtPayload & AuthTokenModel>(
            token.access_token,
          );

          if (decodedToken) {
            const profile = {
              id: decodedToken.sub,
              // name: decodedToken.name,
              // displayName: decodedToken.displayName,
              // email: decodedToken.email,
              // profileImage: decodedToken.profileImage,
              // slug: decodedToken.slug,
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
};
