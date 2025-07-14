import { createFileRoute, redirect } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: ({ context, location }) => {
    // Check if user is authenticated
    if (!context.auth.isAuthenticated && !context.auth.isLoading) {
      // Redirect to login page with the current location as a redirect parameter
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return <Outlet />
}
