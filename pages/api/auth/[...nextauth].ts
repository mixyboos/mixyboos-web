import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import * as https from 'https';
import AuthService from '../../../src/services/api/authService';
import jwt_decode, { JwtPayload } from 'jwt-decode';

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
            return {
              name: decodedToken.sub,
              email: decodedToken.name,
              image: decodedToken.image,
              slug: decodedToken.slug,
              accessToken: token.access_token
            };
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
      if (user?.accessToken) {
        session.accessToken = user.accessToken;
      }
      return session; //.accessToken = user.accessToken;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (profile?.accessToken) {
        token.accessToken = profile.accessToken;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login'
  }
};
export default (req, res) => NextAuth(req, res, options)

