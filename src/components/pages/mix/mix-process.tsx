"use client";
import React, { useEffect } from "react";
import { MixModel } from "@/lib/models";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Clock, RefreshCcw } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useAudioProcessingStatus from "@/lib/services/realtime/hooks/audio-processing-hook";

// Component for mixes that aren't processed yet
const ProcessingMix: React.FC<{ mix: MixModel }> = ({ mix }) => {
  const { isProcessed, processPercentage } = useAudioProcessingStatus();
  // These values will be supplied later by you
  const processingProgress = 45; // Example value
  const processingStatus = "Converting audio..."; // Example value

  useEffect(() => {
    if (isProcessed) {
      console.log("mix-process", "isProcessed", isProcessed);
      console.log("mix-process", "processPercentage", processPercentage);
    }
  }, [isProcessed, processPercentage]);
  // Add reprocess mutation
  const { mutate: reprocess, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/mixes/${mix.id}/reprocess`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to reprocess mix");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Mix reprocessing started");
    },
    onError: () => {
      toast.error("Failed to reprocess mix");
    },
  });

  const handleReprocess = () => {
    reprocess();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2 space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={mix.user?.profileImage} alt={mix.user?.username} />
              <AvatarFallback>
                {mix.user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-base">{mix.title}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full">
            <Clock className="h-3.5 w-3.5" />
            <span>Processing</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
            {mix.image ? (
              <Image
                src={mix.image}
                alt={mix.title}
                layout="fill"
                objectFit="cover"
                className="transition-all hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-xs text-muted-foreground">No image</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {mix.description || "No description provided"}
            </p>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{processingStatus}</span>
                <span
                  className={cn(
                    "font-medium",
                    processingProgress < 30
                      ? "text-red-500"
                      : processingProgress < 70
                      ? "text-amber-500"
                      : "text-green-500"
                  )}
                >
                  {processingProgress}%
                </span>
              </div>
              <Progress
                value={processingProgress}
                className="h-1.5 transition-all"
                color={
                  processingProgress < 30
                    ? "bg-red-500"
                    : processingProgress < 70
                    ? "bg-amber-500"
                    : "bg-green-500"
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 py-2 text-xs border-t bg-muted/40">
        {/* Simplified footer with fewer nested containers */}
        <div className="flex w-full items-center justify-between">
          {/* Left side - upload date */}
          <span className="text-muted-foreground">
            Uploaded {new Date(mix.dateUploaded || Date()).toLocaleDateString()}
          </span>

          {/* Right side - processing message and button */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              Processing will take a minute or two...
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReprocess}
              disabled={isPending}
              className="h-7 px-2 py-0 text-xs"
            >
              {isPending ? (
                <div className="flex items-center">
                  <RefreshCcw className="mr-1 h-3 w-3 animate-spin" />
                  <span>Reprocessing</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <RefreshCcw className="mr-1 h-3 w-3" />
                  <span>Reprocess</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProcessingMix;
