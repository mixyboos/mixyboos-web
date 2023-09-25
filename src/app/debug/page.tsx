"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/widgets/loading";
const IndexPage = () => {
  const { data: session, status } = useSession();
  return (
    <div className="mt-8 flex flex-col space-y-6">
      {status === "loading" ? <Loading /> : JSON.stringify(session, null, 2)}
    </div>
  );
};

export default IndexPage;
