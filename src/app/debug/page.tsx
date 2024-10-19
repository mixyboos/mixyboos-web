"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/widgets/loading";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { error } from "@/lib/components/notifications/toast";
const IndexPage = () => {
  const { data: session, status } = useSession();
  return (
    <div className="mt-8 flex flex-col space-y-6">
      <div>
        <Button
          size={"lg"}
          onClick={() => {
            // toast.error("Tongue punch my fart box", {
            //   description: "Argle bargle",
            // });
            error("Argle bargle", "Tongue punch my fart box");
          }}
        >
          Toast me baby!!
        </Button>
      </div>
      <div>
        {status === "loading" ? <Loading /> : JSON.stringify(session, null, 2)}
      </div>
    </div>
  );
};

export default IndexPage;
