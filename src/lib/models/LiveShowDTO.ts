import type UserDTO from "./UserDTO";

type LiveShowDTO = {
  id: string;
  title: string;
  description: string;
  tags: string[];

  startDate: string;
  isFinished: boolean;

  user: UserDTO;
};
export default LiveShowDTO;
