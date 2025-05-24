import React from "react";
import ChatHeader from "./chat-header";
import ChatItem from "./chat-item";
import ChatInput from "./chat-input";
import type { LiveShowModel, ChatModel } from "@/lib/models";
import User from "@/lib/models/user";
import {useAuth} from '@/lib/contexts/auth/auth-context';

type ChatProps = {
  show: LiveShowModel;
};

const Chat = ({ show }: ChatProps) => {
  const { profile } = useAuth();

  const [message, setMessage] = React.useState("");
  const [roomId, setRoomId] = React.useState("");
  const [messages, setMessages] = React.useState<ChatModel[]>([]);
  const [isJoined, setIsJoined] = React.useState(false);

  const sendMessage = async (message: string): Promise<boolean> => {
    // if (!session || !connection || !message) return false;
    // console.log("Chat", "Sending message", session?.user);
    // const succeeded: boolean = await connection.invoke<boolean>(
    //   "SendMessage",
    //   session.user.profile?.id,
    //   message,
    //   roomId
    // );
    // if (succeeded) {
    //   setMessage("");
    // }
    return await Promise.resolve(true);
  };

  return (
    <div className="mx-auto flex h-full flex-col justify-between overflow-hidden  shadow-xs ">
      <div className="flex justify-between">
        <ChatHeader />
      </div>
      <div className="no-scrollbar grow overflow-scroll bg-secondary">
        {messages.map((item) => (
          <ChatItem
            key={item.id}
            img={item.fromUser.profileImage}
            date={item.timestamp}
            from={item.fromUser.displayName ?? "Unknown user"}
            message={item.message}
            isMe={item.fromUser.username === profile?.username}
            status={"Delivered"}
          />
        ))}
      </div>
      <div className="w-full ">
        <ChatInput onSendChat={sendMessage} enabled={isJoined} />
      </div>
    </div>
  );
};

export default Chat;
