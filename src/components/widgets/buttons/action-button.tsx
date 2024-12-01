"use client";
import React, { type PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Icon, Icons } from "@/components/icons";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IActionButtonProps extends PropsWithChildren {
  count: number;
  title: string;
  isActioned?: boolean;
  icon: Icon;
  onClick: () => Promise<Number>;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  children,
  count,
  title,
  isActioned,
  icon: Icon,
  onClick,
}) => {
  const [currentCount, setCurrentCount] = React.useState<Number>(count);
  return (
    <Button
      variant={"ghost"}
      title={title}
      onClick={async () => {
        const newCount = await onClick();
        setCurrentCount(newCount);
      }}
    >
      <Icon className={cn(isActioned && "text-red-600")} />
      {children}
      <div className="-mx-2 mb-3 text-sm">{currentCount.toString()}</div>
    </Button>
  );
};
export default ActionButton;
