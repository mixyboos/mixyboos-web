import { AuthTokenModel, UserModel } from '../../data/models'
import apiClient, { TKKEY } from './apiClient'

const _storeToken = (token: AuthTokenModel): void => {
  const previousTokens = _retrieveTokens()
  if (previousTokens != null && token.refresh_token == null) {
    token.refresh_token = previousTokens.refresh_token
  }

  localStorage.setItem(TKKEY, JSON.stringify(token))
}

const _retrieveTokens = (): AuthTokenModel => {
  const tokensString = localStorage.getItem(TKKEY)
  const tokensModel: AuthTokenModel =
    tokensString == null ? null : JSON.parse(tokensString)
  return tokensModel
}

class AuthFailed extends Error {}
const authService = {
  getUser: async (): Promise<UserModel> => {
    try {
      const result = await apiClient.get('/profile/me')
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      console.log('authService', 'getUser_error', err)
      if (![401, 400].includes(err.response.status)) throw new Error(err)
    }
    throw new AuthFailed('Authentication failed')
  },
  loginUser: async (username: string, password: string): Promise<boolean> => {
    const url = '/connect/token'
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)
    params.append("grant_type", process.env.NEXT_PUBLIC_AUTH_GRANT_TYPE as string);
    params.append("scope", process.env.NEXT_PUBLIC_AUTH_SCOPE as string);
    params.append("client_id", process.env.NEXT_PUBLIC_AUTH_CLIENT_ID as string);

    try {
      const result = await apiClient.post(url, params, config)
      if (result.status === 200) {
        const model: AuthTokenModel = result.data
        console.log('authService', 'loginUser', result)

        _storeToken(model)
        return true
      } else {
        alert('Fuck off!!!')
      }
    } catch (err) {
      console.log('authService', 'Error logging in user', err)
    }
    return false
  },
}
export { AuthFailed }
export default authService
