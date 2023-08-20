import type ShowStatus from "./show-status";
import type ProfileModel from "./profile";

type LiveShowModel = {
  id: string;
  title: string;
  description: string;
  tags: string[];

  startDate: Date;
  status: ShowStatus;

  user: ProfileModel | undefined;
};
export default LiveShowModel;
