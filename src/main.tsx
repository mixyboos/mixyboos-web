import { StrictMode, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

import { routeTree } from './routeTree.gen'

import './styles/main.css'
import reportWebVitals from './reportWebVitals.ts'
import { AuthProvider, useAuth } from '@/lib/auth.tsx'

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}

function createAppRouter(auth: ReturnType<typeof useAuth>) {
  return createRouter({
    routeTree,
    context: {
      ...TanStackQueryProvider.getContext(),
      auth,
    },
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
  })
}

// Component that creates router with auth context
function App() {
  const auth = useAuth()

  // Create router with auth context, memoized to prevent recreation
  const router = useMemo(
    () => createAppRouter(auth),
    [auth.isAuthenticated, auth.isLoading],
  )

  return (
    <TanStackQueryProvider.Provider>
      <RouterProvider router={router} />
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
