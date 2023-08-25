import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import MixService from "@/lib/services/api/mix-service";
import MixDetailsComponent from "@/components/pages/mix/mix-details-component";

export default async function Page({
  params,
}: {
  params: { username: string; mixSlug: string };
}) {
  const mix = await new MixService().getByUserAndSlug(
    params.username,
    params.mixSlug,
  );
  return (
    <div className="container p-5">
      {mix ? (
        <MixDetailsComponent mix={mix} />
      ) : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-36 w-36 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </div>
      )}
    </div>
  );
}
