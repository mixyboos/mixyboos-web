import React from "react";
import { IoSendSharp } from "react-icons/io5";

type ChatInputProps = {
  onSendChat: (message: string) => Promise<boolean>;
  enabled: boolean;
};

const ChatInput = ({ onSendChat, enabled }: ChatInputProps) => {
  const [message, setMessage] = React.useState("");
  return (
    <div>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center rounded-b-md border-t-2 bg-gray-200 py-2 dark:bg-slate-700">
        <input
          className="ml-1 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Your message..."
          value={message}
          disabled={!enabled}
          onChange={($event) => setMessage($event.currentTarget.value)}
        />
        <button
          onClick={async () => {
            const result = await onSendChat(message);
            if (result) setMessage("");
          }}
          disabled={!enabled}
          type="button"
          className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <IoSendSharp className="h-6 w-6 " fill="currentColor" />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
