import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SessionPrinterProps = {
  sessionType: string;
  session: any;
};

const SessionPrinter: React.FC<SessionPrinterProps> = ({
  sessionType,
  session,
}: SessionPrinterProps) => {
  return (
    <div className="container mt-10 flex w-3/4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>{sessionType}</CardDescription>
        </CardHeader>
        <CardContent className="text-muted grid gap-4">
          {JSON.stringify(session, null, " ")}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionPrinter;
