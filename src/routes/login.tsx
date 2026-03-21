import { Navigate, createFileRoute } from '@tanstack/react-router'
import { AuthProvider, useAuth } from '@/lib/auth'
import LoginForm from '@/components/forms/auth/login-form'
import { siteConfig } from '@/config/site'
import Logo from '@/logo.svg'

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
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-8">
        <div className="flex flex-col items-center space-y-8 w-full max-w-md">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <img
                src={Logo}
                alt={`${siteConfig.name} logo`}
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome to {siteConfig.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              {siteConfig.description}
            </p>
          </div>

          {/* Login Form */}
          <LoginForm
            onSuccess={handleLoginSuccess}
            onError={(error) => console.error('Login error:', error)}
          />
        </div>
      </div>
    </AuthProvider>
  )
}
