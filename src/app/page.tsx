import LoggedInPage from "@/pages/logged-in";
import LandingPage from "@/pages/landing";
import { getServerAuth } from "@/lib/auth/server-auth";

export default async function App() {
  const { isAuthenticated } = await getServerAuth();

  return (
    <div className="text-center">
      {isAuthenticated ? <LoggedInPage /> : <LandingPage />}
    </div>
  );
}
