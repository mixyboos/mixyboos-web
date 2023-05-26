enum ShowStatus {
  checking = "checking",
  setup = "setup",
  awaitingStreamConnection = "awaitingStreamConnection",
  inProgress = "inProgress",
  ending = "ending",
  error = "error",
}

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
export { mapShowStatusFromDb };
export default ShowStatus;
