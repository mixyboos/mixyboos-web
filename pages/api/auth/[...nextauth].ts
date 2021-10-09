import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import * as https from 'https';
import AuthService from '../../../src/services/api/authService';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import Redis from 'ioredis';

if (process.env.DEVELOPMENT) {
  https.globalAgent.options.rejectUnauthorized = false;
}

interface ISignIn {
  csrfToken: string
  userName: string
  password: string
}

interface ITokenPayload {
  'name': string
  'image': string
  'slug': string
}

const options = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, //30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  database: process.env.DATABASE_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.Credentials({
      name: 'Email and Password',
      credentials: {
        userName: { label: 'Username', type: 'text', placeholder: 'Username or email address' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      authorize: async (credentials: ISignIn): Promise<any> => {
        try {
          const authService = new AuthService(null);
          const token = await authService.getAuthToken(credentials.userName, credentials.password);
          if (!token) {
            return null;
          }

          const decodedToken = jwt_decode<JwtPayload & ITokenPayload>(token.access_token);

          if (decodedToken) {
            const profile = {
              id: decodedToken.sub,
              name: decodedToken.name,
              email: decodedToken.name,
              image: decodedToken.image,
              slug: decodedToken.slug,
              accessToken: token.access_token,
              accessTokenExpires: token.expires_in
            };

            const redisClient = new Redis(process.env.SESSION_DATABASE_URL);
            await redisClient.set(decodedToken.sub, JSON.stringify(profile));

            return profile;
          } else {
            return false;
          }
        } catch (err) {
          console.error('NEXT', 'authorize', err);
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session(session, user) {
      if (user?.id) {
        const redisClient = new Redis(process.env.SESSION_DATABASE_URL);
        const storedSession = await redisClient.get(user.id);
        const profile = JSON.parse(storedSession);

        session.email = profile.email;
        session.image = profile.image;
        session.slug = profile.slug;
        session.image = profile.accessToken;
        session.accessToken = profile.accessToken;
      }
      return session; //.accessToken = user.accessToken;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (account && user) {
        if (user?.id) {
          token.id = user.id;
          token.expires = Date.now() + user.expires * 1000;
          return token;
        }
      }

      if (Date.now() < token.exp * 1000) {
        return token;
      }
    }
  },
  pages: {
    signIn: '/login'
  }
};
export default (req, res) => NextAuth(req, res, options)

