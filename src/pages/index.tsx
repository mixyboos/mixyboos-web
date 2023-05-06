import Navbar from "@/lib/components/layout/Navbar";
import { api } from "@/lib/utils/api";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const user = useUser();
  const { data } = api.mix.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Mixy::Boos</title>
        <meta name="description" content="Robot Powered Mixes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div></div>
      </main>
    </>
  );
};

export default Home;
