import React from "react";
import ShowPlayerPage from "./ShowPlayerPage";
import type LiveShowDTO from "@/lib/models/LiveShowDTO";
import type ShowStatus from "./status";

type ShowProps = {
  title: string;
  show: LiveShowDTO;
  showStatus: ShowStatus;
  setShowStatus: (showStatus: ShowStatus) => void;
};

const Show = ({ title, show, showStatus, setShowStatus }: ShowProps) => {
  return (
    <div className="mt-6 overflow-y-auto p-5">
      <div className="flex flex-col lg:flex-row">
        <div className="mr-4 w-full lg:w-9/12">
          <ShowPlayerPage show={show} title={title} />
        </div>
        <aside className="w-full  lg:w-3/12">
          Chat....
          {/* <Chat show={show} /> */}
        </aside>
      </div>
    </div>
  );
};

export default Show;
