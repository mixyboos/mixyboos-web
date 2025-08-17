import LandingPage from "@/pages/landing";
import { getServerAuth } from "@/lib/auth/server-auth";
import { redirect } from "next/navigation";

export default async function App() {
  const { isAuthenticated } = await getServerAuth();

  if (isAuthenticated) {
    redirect("/dashboard");
  }
  return (
    <div className="text-center">
      <LandingPage />
    </div>
  );
}
