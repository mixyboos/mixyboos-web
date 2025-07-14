import { Navigate, createFileRoute } from '@tanstack/react-router'
import { AuthProvider, useAuth } from '@/lib/auth'
import { LoginForm } from '@/components/forms/auth/login-form'

type LoginSearch = {
  redirect?: string
}

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirect: search.redirect as string,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated, isLoading } = useAuth()
  const { redirect } = Route.useSearch()
  
  if (isAuthenticated && !isLoading) {
    // Redirect to the original location or home page
    return <Navigate to={redirect || '/'} />
  }

  const handleLoginSuccess = () => {
    // Navigate to the redirect URL or home page after successful login
    window.location.href = redirect || '/'
  }

  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <LoginForm
          onSuccess={handleLoginSuccess}
          onError={(error) => console.error('Login error:', error)}
        />
      </div>
    </AuthProvider>
  )
}
