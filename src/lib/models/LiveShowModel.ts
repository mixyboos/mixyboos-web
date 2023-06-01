import type ShowStatus from "./ShowStatus";
import type UserModel from "./UserModel";

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
