import PlayersComponent from "@/lib/components/stats/PlayersComponent";
import PlaysComponent from "@/lib/components/stats/PlaysComponent";
import React, { Component } from "react";

type DashboardPageProps = {
  prop1: string;
};

const DashboardPage = ({ prop1 }: DashboardPageProps) => {
  return (
    <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
      <PlaysComponent />
      <PlayersComponent />
    </div>
  );
};

export default DashboardPage;
