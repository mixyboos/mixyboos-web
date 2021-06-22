import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '.'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = React.useContext(AuthContext)

  React.useEffect(() => {
    console.log('PrivateRoute', 'authenticated', authenticated)
  }, [authenticated])
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
