import React from 'react'
import { UserModel } from '../../data/models'
import authService from '../api/authService'
import { AuthContext } from './AuthContext'
import { usePrevious } from './usePrevious'

export type AuthProviderProps = {
  defaultAuthenticated?: boolean
  defaultUser: UserModel | undefined

  onLogin?: () => void
  onLogout?: () => void
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  defaultAuthenticated = false,
  defaultUser = undefined,
  onLogin,
  onLogout,
  children,
}) => {
  const [authenticated, setAuthenticated] = React.useState(defaultAuthenticated)
  const [user, setUser] = React.useState(defaultUser)

  const previousAuthenticated = usePrevious(authenticated)

  React.useEffect(() => {
    authService.getUser().then(
      (user: UserModel) => {
        console.log('AuthProvider', 'getUser_success', user)
        setAuthenticated(true)
        setUser(user)
      },
      (error) => {
        console.log('AuthProvider', 'getUser_failure', error)
        setAuthenticated(false)
        setUser(undefined)
      }
    )
  }, [authenticated])

  React.useEffect(() => {
    if (!previousAuthenticated && authenticated) {
      onLogin && onLogin()
    }
  }, [previousAuthenticated, authenticated, onLogin])

  React.useEffect(() => {
    if (previousAuthenticated && !authenticated) {
      onLogout && onLogout()
    }
  }, [previousAuthenticated, authenticated, onLogout])

  const contextValue = React.useMemo(
    () => ({
      authenticated,
      setAuthenticated,
      user,
      setUser,
    }),
    [authenticated, user]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
