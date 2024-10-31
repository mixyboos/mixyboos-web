import type ShowStatus from "./show-status";
import type ProfileModel from "./profile";

class LiveShowModel {
  constructor(
    title: string,
    description: string,
    tags: string[],
    startDate: Date,
    status: ShowStatus,
  ) {
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.startDate = startDate;
    this.status = status;
  }
  id?: string;
  title: string;
  description: string;
  tags: string[];

  startDate: Date;
  status: ShowStatus;

  user: ProfileModel | undefined;
  fromJson = (model: string) => {

  };
}
export default LiveShowModel;
