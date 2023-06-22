"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/styles";
import { Switch } from "@headlessui/react";
import { BellRing, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const IndexPage = () => {
  const session = useSession();
  return (
    <div className="container mt-10 flex w-3/4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Client side session.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-muted">
          {JSON.stringify(session, null, " ")}
        </CardContent>
      </Card>
    </div>
  );
};

export default IndexPage;
