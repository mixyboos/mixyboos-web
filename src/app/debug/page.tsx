import Session from "@/lib/components/debug/Session";
import { authOptions } from "@/lib/services/auth/config";
import { getServerSession } from "next-auth";
import React from "react";

const IndexPage = () => {
  const session = getServerSession(authOptions);
  return <Session serverSession={session} />;
};

export default IndexPage;
