import { AxiosError } from 'axios'
import type { ProfileModel } from '@/lib/models/profile'
import api from '@/lib/services/api/api-client'
import ProfileService from '@/lib/services/api/profile-service'

const AuthService = {
  login: async (username: string, password: string) => {
    const response = await api.post(
      '/auth/login?useCookies=true',
      {
        email: username,
        password: password,
      },
      { withCredentials: true },
    )
    return response
  },
  logout: async (callbackUrl?: string): Promise<boolean> => {
    const response = await api.delete('/account/logout', {
      withCredentials: true,
    })
    if (response.status === 200) {
      document.cookie.split(';').forEach((cookie) => {
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      })
      if (callbackUrl) {
        window.location.href = callbackUrl
      }
    }
    return response.status === 200
  },

  register: async (
    email: string,
    password: string,
    confirmPassword: string,
    username: string = '',
  ): Promise<boolean> => {
    const url = '/account/register'
    const result = await api.post(url, {
      username: email,
      password,
      confirmPassword,
      displayName: username,
    })

    if (result.status === 200) {
      return true
    } else if (result.status === 400) {
      console.log('authService', 'register', result)
    }
    return false
  },
  getProfile: async (): Promise<ProfileModel | undefined> => {
    try {
      const result = await ProfileService.getProfile()
      return result
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log('authService', 'getProfile_error', err)
        if (![401, 400].includes(err.status as number))
          throw new Error(err.message, { cause: err })
      }
    }
    return undefined
  },
}
export default AuthService
