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

interface IAuthResult {
  status: string
  profile: UserModel
  token: AuthTokenModel
}

const _refreshAccessToken = async (prevToken) => {
  const token = await refreshAuthToken(prevToken);

  return {
    accessToken: token.accessToken,
    accessTokenExpires: Date.now() + token.expiresIn * 1000
  };
};

const options = {
  providers: [
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
            return Promise.resolve({
              status: 'success',
              profile: user,
              token: token
            } as IAuthResult);
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
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.name = profile.profile.displayName;
        token.email = profile.profile.userName;
        token.image = profile.profile.image;
        token.accessToken = user.token.access_token;
        // token.refreshToken = user.token.refresh_token;
        user = profile.profile;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login'
  }
};

export default (req, res) => NextAuth(req, res, options)

