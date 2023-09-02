import HeroPage from "@/lib/components/pages/HeroPage";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/services/auth/config";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
    return;
  }
  return <HeroPage />;
};

export default Home;
