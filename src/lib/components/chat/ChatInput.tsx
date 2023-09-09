import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { IoSendSharp } from "react-icons/io5";

type ChatInputProps = {
  onSendChat: (message: string) => Promise<boolean>;
  enabled: boolean;
};

const ChatInput = ({ onSendChat, enabled }: ChatInputProps) => {
  const [message, setMessage] = React.useState("");
  return (
    <div className="space-2 flex w-full max-w-sm items-center pt-2">
      <Input type="email" size="lg" placeholder="Be kind..." />
      <Button type="submit" variant="ghost">
        <Icons.send />{" "}
      </Button>
    </div>
  );
};

export default ChatInput;
