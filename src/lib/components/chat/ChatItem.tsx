import React, { Component } from "react";
import classNames from "classnames";
import UserImage from "../widgets/UserImage";

type ChatItemProps = {
  img?: string;
  date: Date;
  from: string;
  message: string;
  status: string;
  isMe: boolean;
};

const ChatItem = ({
  img,
  date,
  from,
  message,
  status,
  isMe,
}: ChatItemProps) => {
  return (
    <>
      <div
        className={classNames(
          "mt-2 flex w-full max-w-xs space-x-3 px-2",
          isMe ? "justify-end" : ""
        )}
      >
        {!isMe && <UserImage src={img || ""} size={"sm"} />}
        <div>
          <div
            className={classNames(
              "bg-gray-300 p-3 ",
              isMe ? "rounded-l-lg rounded-br-lg" : "rounded-r-lg rounded-bl-lg"
            )}
          >
            <p className="text-sm">{message}</p>
          </div>
          <span className="text-xs leading-none text-gray-500">2 min ago</span>
        </div>
        {isMe && <UserImage src={img || ""} size={"sm"} />}
      </div>
    </>
  );
};

export default ChatItem;
