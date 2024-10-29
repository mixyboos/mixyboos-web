"use client";
import LoginForm from "@/components/forms/auth/login-form";
import { useAuth } from "@/lib/contexts/auth/auth-context";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="m-28">
      {user ? <h1>Welcome {user.slug}</h1> : <LoginForm />}

      <div>{user?.name}</div>
    </div>
  );
}
