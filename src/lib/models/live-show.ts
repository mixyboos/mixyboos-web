import type ShowStatus from "./show-status";
import type UserModel from "./user";

type LiveShowModel = {
  id: string;
  title: string;
  description: string;
  tags: string[];

  startDate: Date;
  status: ShowStatus;

  user: UserModel | undefined;
};
export default LiveShowModel;
