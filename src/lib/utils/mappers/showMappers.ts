import { ShowStatus } from "@/lib/models";
import type { LiveShowModel } from "@/lib/models";
import { type LiveShow } from "@prisma/client";
import { randomUUID } from "crypto";
import { type User } from "next-auth";
import { mapUserToUserModel } from "./userMapper";

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
      return ShowStatus.ending;
    default:
      return ShowStatus.setup;
  }
};

const mapNoShowToShowModel = (user: User): LiveShowModel => {
  return {
    id: randomUUID().toString(),
    title: "",
    tags: [],
    description: "",
    startDate: new Date(),
    status: ShowStatus.setup,
    user: mapUserToUserModel(user),
  };
};
const mapShowToShowModel = (
  show: LiveShow,
  user: User | undefined
): LiveShowModel => ({
  ...show,
  tags: ["House"],
  status: mapShowStatusFromDb(show.status),
  user: mapUserToUserModel(user),
});
export { mapShowStatusFromDb, mapShowToShowModel, mapNoShowToShowModel };
