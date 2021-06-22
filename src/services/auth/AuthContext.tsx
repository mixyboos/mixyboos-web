import React from 'react'
import { UserModel } from '../../data/models'
const noop = () => {}

export type IAuthContext = {
  authenticated: boolean
  setAuthenticated: (isAuthenticated: boolean) => void
  user: UserModel | undefined
  setUser: (user: UserModel) => void
}

export const AuthContext = React.createContext<IAuthContext>({
  authenticated: false,
  setAuthenticated: noop,
  user: undefined,
  setUser: (user: UserModel) => (user = user),
})
