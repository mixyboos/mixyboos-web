import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

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
  return (
    <div>
      <Outlet />
    </div>
  )
}
