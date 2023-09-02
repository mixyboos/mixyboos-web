import React from "react";
import { useSession } from "next-auth/react";
import { type MixModel } from "@/lib/models";
import Loading from "@/components/widgets/loading";

interface IMixProcessingStatusProps {
  mix: MixModel;
  title?: string;
  onProcessingFinished: () => void;
}
const MixProcessingStatus = ({
  mix,
  title = "",
  onProcessingFinished,
}: IMixProcessingStatusProps) => {
  const { data: session, status } = useSession();
  const [message, setMessage] = React.useState<string>(title);

  return (
    <div className="p-1">
      <Loading message={message} />
    </div>
  );
};

export default MixProcessingStatus;
