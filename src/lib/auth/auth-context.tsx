"use client"
import * as React from 'react'
import type { ProfileModel } from '@/lib/models/profile'
import AuthService from '@/lib/services/api/auth/auth-service'
import logger from '@/lib/logger'

export interface AuthContextType {
  profile: ProfileModel | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getProfile: () => Promise<ProfileModel | null>
}

// Auth Context
const AuthContext = React.createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = React.useState<ProfileModel | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // Check for existing session on mount
  React.useEffect(() => {
    const initializeAuth = async () => {
      try {
        logger.debug('initializeAuth')
        const p = await AuthService.getProfile()
        if (!p) {
          logger.warn(
            'No user profile found, user may not be authenticated.',
          )
          setProfile(null)
          return
        }
        setProfile(p)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to initialize auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await AuthService.login(email, password)
      if (response.status !== 200) {
        throw new Error('Login failed')
      }
      setProfile(response.data as ProfileModel)
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      throw new Error(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await AuthService.logout()
      setProfile(null)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getProfile = async (): Promise<ProfileModel | null> => {
    try {
      const p = await AuthService.getProfile()
      if (!p) {
        throw new Error('No user profile found')
      }
      setProfile(p)
      return p
    } catch (error) {
      console.error('Get profile error:', error)
      setProfile(null)
      return null
    }
  }

  const value: AuthContextType = {
    profile: profile,
    isLoading,
    isAuthenticated: !!profile,
    login,
    logout,
    getProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
