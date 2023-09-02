import React from "react";
import ShowPlayerPage from "./ShowPlayerPage";
import type { LiveShowModel } from "@/lib/models";
import ShowStatus from "../../models/show-status";
import { Chat } from "../chat";
import { createPusherClient } from "@/lib/services/realtime";

type ShowProps = {
  title: string;
  show: LiveShowModel;
  setShow: (show: LiveShowModel) => void;
};

const Show = ({ title, show, setShow }: ShowProps) => {
  const pusher = createPusherClient();

  const showChannel = `ls_${show?.id}`;
  const channel = pusher.subscribe(showChannel);

  channel.bind("show-finished", (data: LiveShowModel) => {
    console.log("Show", "Show finished", data);
    setShow({
      ...show,
      status: ShowStatus.ended,
    });
  });
  React.useEffect(() => {
    return () => {
      pusher.unsubscribe(showChannel);
      channel.disconnect();
    };
  });
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 text-gray-900">
      <div className="col-span-5 rounded-lg border bg-card text-card-foreground shadow-sm">
        <ShowPlayerPage show={show} title={title} />
      </div>
      <div className="col-span-2 rounded-lg border bg-card text-card-foreground shadow-sm">
        <Chat show={show} />
      </div>
    </div>
    // <div className="mt-6 overflow-y-auto p-5">
    //   <div className="flex flex-col lg:flex-row">
    //     <div className="mr-4 w-full lg:w-9/12">
    //       <ShowPlayerPage show={show} title={title} />
    //     </div>
    //     <aside className="w-full  lg:w-3/12">
    //       <Chat show={show} />
    //     </aside>
    //   </div>
    // </div>
  );
};

export default Show;
