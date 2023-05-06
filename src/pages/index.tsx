import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const user = useUser();
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

          {/* <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /> */}
        </div>
      </main>
    </>
  );
};

export default Home;
