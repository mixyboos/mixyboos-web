import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'

const LoggedInPage = () => {
  const { profile, logout } = useAuth()
  if (!profile) {
    return <div className="text-center">Loading profile...</div>
  }
  return (
    <>
      <div className="text-2xl font-bold mb-4">
        Welcome, {profile.displayName || profile.email}!
      </div>
      <div className="text-md">{profile.biography}</div>
      <Button className="mt-4" onClick={logout}>
        Logout
      </Button>
    </>
  )
}

export default LoggedInPage
