import { LiveShow } from "@/db/schema";
import { ShowStatus, type ProfileModel } from "@/lib/models";
import type { LiveShowModel } from "@/lib/models";
import { randomUUID } from "crypto";

const mapShowStatusFromDb = (
  status: "SETUP" | "AWAITING" | "STREAMING" | "FINISHED"
): ShowStatus => {
  switch (status) {
    case "SETUP":
      return ShowStatus.setup;
    case "AWAITING":
      return ShowStatus.awaitingStreamConnection;
    case "STREAMING":
      return ShowStatus.inProgress;
    case "FINISHED":
      return ShowStatus.ended;
    default:
      return ShowStatus.setup;
  }
};

const mapNoShowToShowModel = (user: ProfileModel): LiveShowModel => {
  return {
    id: randomUUID().toString(),
    title: "",
    tags: [],
    description: "",
    startDate: new Date(),
    status: ShowStatus.setup,
    user: user,
  };
};
const mapShowToShowModel = (
  show: LiveShow,
  user: ProfileModel | undefined
): LiveShowModel => ({
  ...show,
  tags: ["House"],
  status: mapShowStatusFromDb(show.status),
  user: user,
});
export { mapShowStatusFromDb, mapShowToShowModel, mapNoShowToShowModel };
