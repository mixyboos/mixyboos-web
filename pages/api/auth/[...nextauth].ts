import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { getAuthToken, getUserProfile, refreshAuthToken } from '../../../src/services/auth/server/AuthHelpers';
import * as https from 'https';
import { AuthTokenModel, UserModel } from '../../../src/data/models';

if (process.env.DEVELOPMENT) {
  https.globalAgent.options.rejectUnauthorized = false;
}

interface ISignIn {
  csrfToken: string
  userName: string
  password: string
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
          const token = await getAuthToken(credentials.userName, credentials.password);
          if (!token) {
            return null;
          }
          const user = await getUserProfile(token.access_token);

          if (user) {
            user.accessToken = token.access_token;
            return {
              name: user.displayName,
              email: user.userName,
              image: user.image
            };
          } else {
            return null;
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
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
};
export default (req, res) => NextAuth(req, res, options)

