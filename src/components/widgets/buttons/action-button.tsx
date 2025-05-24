"use client";
import React, { type PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

interface IActionButtonProps extends PropsWithChildren {
  count: number;
  title: string;
  isActioned?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  // onClick: () => Promise<{ newCount: number; newIsActioned: boolean }>;
  onClick: () => void;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  children,
  count,
  title,
  isActioned,
  icon: Icon,
  onClick,
}) => {
  return (
    <Button
      variant={"ghost"}
      title={title}
      onClick={async () => {
        await onClick();
      }}
    >
      {Icon && <Icon className={cn(isActioned && "text-red-600")} />}
      {children}
      <div className={cn("-mx-2 mb-3 text-sm", isActioned && "text-red-600")}>
        {count.toString()}
      </div>
    </Button>
  );
};
export default ActionButton;
