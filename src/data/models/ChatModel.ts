interface ChatModel {
  fromUser: string;
  toUser: string;
  timestamp: Date;
  message: string;
}
export default ChatModel;
