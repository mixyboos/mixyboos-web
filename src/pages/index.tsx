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
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>
          {!user.isSignedIn && <SignInButton />}
          {!!user.isSignedIn && <UserButton />}
          {data?.map((p) => {
            return <div key={p.id}>{p.title}</div>;
          })}
          {/* <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /> */}
        </div>
      </main>
    </>
  );
};

export default Home;
