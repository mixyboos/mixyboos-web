import HeroPage from "@/lib/components/pages/HeroPage";
import React from "react";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-slate-800">
      <div>
        <HeroPage />
      </div>
    </main>
  );
};

export default Home;
