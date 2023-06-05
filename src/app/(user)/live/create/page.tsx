"use client";
import React from "react";
import { api } from "@/lib/utils/api";
import LiveShowWrapper from "@/lib/components/show/LiveShowWrapper";
import Loading from "@/lib/components/widgets/Loading";

const LivePage = () => {
  const { isFetching, data: show } = api.show.getInProgress.useQuery();
  return isFetching ? <Loading /> : <LiveShowWrapper incomingShow={show} />;
};

export default LivePage;
