import HeroPage from "@/lib/components/pages/HeroPage";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/services/auth/config";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {session ? <h1>Hello Sailor</h1> : <HeroPage />}
    </main>
  );
};

export default Home;
