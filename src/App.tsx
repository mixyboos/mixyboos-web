import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import PageContainer from './components/PageContainer'
import { ForgotPage, LoginPage, RegisterPage } from './pages/auth'
import DebugPage from './pages/DebugPage'
import DiscoverPage from './pages/DiscoverPage'
import HomePage from './pages/HomePage'
import MixUploadPage from './pages/MixUploadPage'
import { AuthProvider } from './services/auth/AuthProvider'

const App = () => {
  const [token, setToken] = useState()

  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <PageContainer>
            <Switch>
              <Route path="/upload">
                <MixUploadPage />
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
    </AuthProvider>
  )
}

export default App
