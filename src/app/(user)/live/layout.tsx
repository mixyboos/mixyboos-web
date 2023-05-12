import React from "react";

const LiveLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-full overflow-hidden px-4 ">{children}</div>
  );
};

export default LiveLayout;
