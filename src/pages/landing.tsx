import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

const LandingPage = () => {
  return (
    <>
      <div className="text-red-800">I am landing</div>
      <Link to="/login">
        <Button variant="outline" size="lg">
          Login
        </Button>
      </Link>
    </>
  )
}
export default LandingPage
