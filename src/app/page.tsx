"use client";
import HeroPage from "@/components/pages/hero-page";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import { redirect } from "next/navigation";

export default function Home() {
  const { profile } = useAuth();

  if (profile) {
    redirect("/dashboard");
  }
  return (
    <div className="m-28">
      <HeroPage />
    </div>
  );
}
