import type UserModel from "./UserModel";

type ChatModel = {
  id: string;
  fromUser: UserModel;
  toUser: UserModel;
  timestamp: Date;
  message: string;
};

export default ChatModel;
