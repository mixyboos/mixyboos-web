import type UserModel from "./user";

type ChatModel = {
  id: string;
  fromUser: UserModel;
  toUser: UserModel;
  timestamp: Date;
  message: string;
};

export default ChatModel;
