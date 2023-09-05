import { IoPeopleOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { BsChatText } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const ChatHeader = () => {
  return (
    <div className="flex w-full flex-row rounded-t-xl border p-4 ">
      <div className="flex-none">
        <Button
          title="Settings"
          type="button"
          variant={"ghost"}
          className="inline-flex cursor-pointer text-muted-foreground"
        >
          <Icons.settings className="h-6 w-6" />
        </Button>
      </div>

      <div className="mx-auto flex flex-1 items-center justify-center">
        <div className="gap-4">
          <span>Be</span>
          <Icons.heart className="hi-mini hi-chat-bubble-left-right inline-block h-4 w-4 text-red-600 transition ease-out group-hover:-rotate-6" />
          <span>Kind</span>
        </div>
      </div>
      <div className="flex-none justify-end">
        <button
          title="People"
          type="button"
          className="inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <IoPeopleOutline className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
