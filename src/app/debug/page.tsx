import Session from "@/lib/components/debug/Session";
import { getServerSession } from "next-auth";
import React from "react";

const IndexPage = () => {
  const session = getServerSession();
  return <Session serverSession={session} />;
};

export default IndexPage;
