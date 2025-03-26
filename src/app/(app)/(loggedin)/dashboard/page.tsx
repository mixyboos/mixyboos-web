import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowersGraph from "@/components/widgets/stats/followers-graph";
import PlaysGraph from "@/components/widgets/stats/plays-graph";
import React from "react";

const Dashboard = () => {
  return (
    <div className="@container grid flex-1 gap-4 p-4">
      I'm a little dashboard, short and stout!!
    </div>
  );
};

export default Dashboard;
