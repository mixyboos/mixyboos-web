import React from "react";
import { useSession } from "next-auth/react";
import ChatHeader from "./ChatHeader";
import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";
import type { LiveShowModel, ChatModel } from "@/lib/models";

type ChatProps = {
  show: LiveShowModel;
};

const Chat = ({ show }: ChatProps) => {
  const { data: session, status } = useSession();
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
    <div className="mx-auto flex h-full min-h-full  flex-col justify-between overflow-hidden ">
      <div className="flex justify-between">
        <ChatHeader />
      </div>
      <div className="flex-grow overflow-scroll bg-white dark:bg-slate-600">
        {messages.map((item) => (
          <ChatItem
            key={item.id}
            img={item.fromUser.profileImage}
            date={item.timestamp}
            from={item.fromUser.displayName}
            message={item.message}
            isMe={item.fromUser.username === session?.user.username}
            status={"Delivered"}
          />
        ))}
      </div>
      <div className="w-full flex-none">
        <ChatInput onSendChat={sendMessage} enabled={isJoined} />
      </div>
    </div>
  );
};

export default Chat;
