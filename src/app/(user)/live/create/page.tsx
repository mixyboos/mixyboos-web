"use client";
import React from "react";
import { api } from "@/lib/utils/api";
import LiveShowWrapper from "@/lib/components/show/LiveShowWrapper";
import Loading from "@/lib/components/widgets/Loading";

const LivePage = () => {
  // const { data: show } = api.show.getInProgress.useQuery();
  const response = api.show.getInProgress.useQuery();

  return (
    <div className="-mb-16 h-screen overflow-y-hidden">
      {response.isFetching ? (
        <Loading />
      ) : (
        <LiveShowWrapper incomingShow={response.data} />
      )}
    </div>
  );
};

export default LivePage;
