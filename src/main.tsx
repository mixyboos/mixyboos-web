import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { AuthProvider, useAuth } from '@/lib/auth.tsx'

// Create router function that will be called with auth context
function createAppRouter() {
  return createRouter({
    routeTree,
    context: {
      ...TanStackQueryProvider.getContext(),
      // Auth will be provided by the RouterProvider component
      auth: undefined!,
    },
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
  })
}

const router = createAppRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Component that provides router with auth context
function App() {
  const auth = useAuth()
  
  return (
    <TanStackQueryProvider.Provider>
      <RouterProvider router={router} context={{ auth }} />
    </TanStackQueryProvider.Provider>
  )
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
