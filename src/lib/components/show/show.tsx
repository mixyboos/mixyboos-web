import React from "react";
import ShowPlayerPage from "./show-player";
import type { LiveShowModel } from "@/lib/models";
import ShowStatus from "../../models/show-status";
import { Chat } from "../chat";

type ShowProps = {
  title: string;
  show: LiveShowModel;
  setShow: (show: LiveShowModel) => void;
};

const Show = ({ title, show, setShow }: ShowProps) => {
  // const showChannel = `ls_${show?.id}`;

  // channel.bind("show-finished", (data: LiveShowModel) => {
  //   console.log("Show", "Show finished", data);
  //   setShow({
  //     ...show,
  //     status: ShowStatus.ended,
  //   });
  // });
  // React.useEffect(() => {
  //   return () => {
  //     pusher.unsubscribe(showChannel);
  //     channel.disconnect();
  //   };
  // });
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-grow w-3/4">
        <ShowPlayerPage show={show} title={title} />
      </div>
      <div>
        <Chat show={show} />
      </div>
    </div>
  );
};

export default Show;
