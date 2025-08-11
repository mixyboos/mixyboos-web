import { useAuth } from "@/lib/auth";
import LoggedInPage from "@/pages/logged-in";
import LandingPage from "@/pages/landing";

export default function App() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="text-center">
      {isAuthenticated ? <LoggedInPage /> : <LandingPage />}
    </div>
  );
}
