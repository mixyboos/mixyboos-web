import type ProfileModel from "./profile";

type ChatModel = {
  id: string;
  fromUser: ProfileModel;
  toUser: ProfileModel;
  timestamp: Date;
  message: string;
};

export default ChatModel;
