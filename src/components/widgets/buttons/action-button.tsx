"use client";
import React, { type PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";

interface IActionButtonProps extends PropsWithChildren {
  count: number;
  title: string;
  onClick: () => Promise<Number>;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  children,
  count,
  title,
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
      {children}
      <div className="-mx-2 mb-3 text-sm">{currentCount.toString()}</div>
    </Button>
  );
};
export default ActionButton;
