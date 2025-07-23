import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    console.log('🔒 Auth guard - beforeLoad called for:', location.pathname)
    console.log('🔒 Is authenticated:', context.auth.isAuthenticated)
    console.log('🔒 Is loading:', context.auth.isLoading)
    
    // Check if user is authenticated
    if (!context.auth.isAuthenticated && !context.auth.isLoading) {
      console.log('🔒 Redirecting to login...')
      // Redirect to login page with the current location as a redirect parameter
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
    
    console.log('🔒 Auth guard passed, allowing access')
  },
  component: AuthenticatedLayoutComponent,
})

function AuthenticatedLayoutComponent() {
  const auth = useAuth()
  
  return (
    <div>
      <div style={{ padding: '10px', backgroundColor: '#f0f0f0', margin: '10px', borderRadius: '5px' }}>
        <h3>🔒 Protected Area</h3>
        <p>You are authenticated! ✅</p>
        <p>Is Authenticated: {String(auth.isAuthenticated)}</p>
        <p>Is Loading: {String(auth.isLoading)}</p>
      </div>
      <Outlet />
    </div>
  )
}
