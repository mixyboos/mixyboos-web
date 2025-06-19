import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth'
import LoggedInPage from '@/pages/logged-in'
import LandingPage from '@/pages/landing'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="text-center">
      {isAuthenticated ? <LoggedInPage /> : <LandingPage />}
    </div>
  )
}
