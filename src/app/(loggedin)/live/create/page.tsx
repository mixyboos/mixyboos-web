import React from "react";
import LiveShowWrapper from "@/lib/components/show/LiveShowWrapper";
import LiveService from "@/lib/services/api/live-service";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/services/auth/config";

const LivePage = async () => {
  const session = await getServerSession(authOptions);

  const show = await new LiveService(
    session?.user.accessToken,
  ).getMyShowInProgress();
  return session ? (
    <LiveShowWrapper incomingShow={show} />
  ) : (
    JSON.stringify(session)
  );
};

export default LivePage;
