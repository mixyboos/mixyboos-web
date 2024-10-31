"use client";
import LoginForm from "@/components/forms/auth/login-form";
import DebugPage from "@/components/pages/debug";
import { useAuth } from "@/lib/contexts/auth/auth-context";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="m-28">
      {user ? <DebugPage /> : <LoginForm />}

      <div>{user?.name}</div>
    </div>
  );
}
