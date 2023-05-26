import { IoPeopleOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { BsChatText } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";

const ChatHeader = () => {
  return (
    <div className="flex w-full flex-row rounded-t-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-slate-700">
      <div className="flex-none">
        <button
          title="Settings"
          type="button"
          className="inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <FiSettings className="h-6 w-6" />
        </button>
      </div>

      <div className="mx-auto flex flex-1 items-center justify-center">
        <span>
          Be
          <span className="font-medium text-indigo-600">
            <BiHeart className="hi-mini hi-chat-bubble-left-right inline-block h-5 w-5 text-red-600 transition ease-out group-hover:-rotate-6" />
            Kind
          </span>
        </span>
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
