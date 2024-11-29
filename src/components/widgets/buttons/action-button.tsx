"use client";
import React, { type PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";

interface IActionButtonProps extends PropsWithChildren {
  count: number;
  onClick: () => Promise<Number>;
}

const ActionButton: React.FC<IActionButtonProps> = ({ children, count, onClick }) => {
  const [currentCount, setCurrentCount] = React.useState<Number>(count);
  return (
    <Button
      variant={"ghost"}
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
