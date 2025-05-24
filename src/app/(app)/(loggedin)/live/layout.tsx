import React from "react";

const LiveLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    //     padding-top: 24px;
    // padding-right: 128px;
    // padding-bottom: 24px;
    // padding-left: 128px;
    <div className="py-6">{children}</div>
  );
};

export default LiveLayout;
