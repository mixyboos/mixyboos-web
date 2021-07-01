import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PageContainer } from './components'
import './index.css'
import {
  DebugPage,
  DiscoverPage,
  HomePage, LivePage, MixCreatePage
} from './pages'
import { ForgotPage, LoginPage, RegisterPage } from './pages/auth'
import { AudioProvider } from './services/audio'
import { AuthContext, AuthProvider, AuthProviderProps } from './services/auth'

const App = ({
  onLogin,
  onLogout,
  defaultAuthenticated,
}: AuthProviderProps) => {
  const { authenticated, setAuthenticated } = React.useContext(AuthContext)
  React.useEffect(() => {}, [authenticated])
  return (
    <AuthProvider>
      <AudioProvider>
        <div className="App">
          <Router>
            <PageContainer>
              <Switch>
                <Route component={MixCreatePage} path="/upload" />
                {/* <PrivateRoute
                authed={authenticated}
                component={MixCreatePage}
                path="/upload"
              /> */}
                <Route path="/upload">
                  <MixCreatePage />
                </Route>
                <Route path="/live">
                  <LivePage />
                </Route>
                <Route path="/discover">
                  <DiscoverPage />
                </Route>
                <Route path="/debug">
                  <DebugPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/forgot">
                  <ForgotPage />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </PageContainer>
          </Router>
        </div>
      </AudioProvider>
    </AuthProvider>
  )
}

export default App
