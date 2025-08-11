"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/widgets/spinner";
import { useAuth } from "@/lib/auth/auth-context";

const LoggedInPage = () => {
  const { isLoading, profile, logout } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }
  if (!profile) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
        <p className="text-md">
          You are not logged in. Please log in to access your profile.
        </p>
        <Button
          className="mt-4"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </Button>
      </div>
    );
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
  );
};

export default LoggedInPage;
