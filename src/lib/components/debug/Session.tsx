"use client";
import React from "react";
import SessionPrinter from "./SessionPrinter";
import { useSession } from "next-auth/react";

type SessionProps = {
  serverSession: any;
};

const Session: React.FC<SessionProps> = ({ serverSession }) => {
  const session = useSession();
  return (
    <div>
      <SessionPrinter
        session={serverSession}
        sessionType={"Server side session."}
      />
      <SessionPrinter session={session} sessionType={"Client side session."} />
    </div>
  );
};

export default Session;
