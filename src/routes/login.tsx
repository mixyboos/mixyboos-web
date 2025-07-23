import { Navigate, createFileRoute } from '@tanstack/react-router'
import { AuthProvider, useAuth } from '@/lib/auth'
import LoginForm from '@/components/forms/auth/login-form'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated, isLoading } = useAuth()
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" />
  }

  const handleLoginSuccess = () => {
    window.location.href = '/'
  }

  return (
    <AuthProvider>
      <div className="min-h-full w-full flex items-center justify-center bg-background px-4">
        <LoginForm
          onSuccess={handleLoginSuccess}
          onError={(error) => console.error('Login error:', error)}
        />
      </div>
    </AuthProvider>
  )
}
