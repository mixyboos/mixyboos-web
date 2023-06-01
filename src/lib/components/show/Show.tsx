import React from "react";
import ShowPlayerPage from "./ShowPlayerPage";
import type { LiveShowModel } from "@/lib/models";
import ShowStatus from "../../models/ShowStatus";
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
      status: ShowStatus.ending,
    });
  });
  React.useEffect(() => {
    return () => {
      pusher.unsubscribe(showChannel);
      channel.disconnect();
    };
  });
  return (
    <div className="mt-6 overflow-y-auto p-5">
      <div className="flex flex-col lg:flex-row">
        <div className="mr-4 w-full lg:w-9/12">
          <ShowPlayerPage show={show} title={title} />
        </div>
        <aside className="w-full  lg:w-3/12">
          <Chat show={show} />
        </aside>
      </div>
    </div>
  );
};

export default Show;
