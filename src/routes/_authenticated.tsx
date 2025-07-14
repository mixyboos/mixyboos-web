import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    // Check if user is authenticated
    if (!context.auth?.isAuthenticated && !context.auth?.isLoading) {
      // Redirect to login page with the current location as a redirect parameter
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthenticatedLayoutComponent,
})

function AuthenticatedLayoutComponent() {
  return <Outlet />
}
