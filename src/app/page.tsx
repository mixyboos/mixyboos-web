"use client";
import LoginForm from "@/components/forms/auth/login-form";
import DebugPage from "@/components/pages/debug";
import HeroPage from "@/components/pages/hero-page";
import { useAuth } from "@/lib/contexts/auth/auth-context";

export default function Home() {
  const { profile } = useAuth();
  return (
    <div className="m-28">
      {profile ? <DebugPage /> : <HeroPage />}

      <div>{profile?.name}</div>
    </div>
  );
}
