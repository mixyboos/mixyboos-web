import React from "react";
import { Icons } from "../icons";

interface ILoadingProps {
  title?: string;
  message?: string;
}
const Loading = ({ title = "Loading...", message = "" }: ILoadingProps) => {
  return (
    <>
      <div role="status" className="flex flex-row space-x-1">
        <Icons.waiting className="mr-2 w-8 h-8 animate-spin "></Icons.waiting>
        <div>
          <p className="text-sm font-medium leading-none">{title}</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </>
  );
};

export default Loading;
