import { api } from "@/lib/utils/api";
import { showRouter } from "@/server/api/routers/show";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process a POST request
    const { name: streamKey } = req.body as { name: string };

    const { data: user } = api.user.getByStreamKey.useQuery({ streamKey });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorised!" });
    }

    const { data: show } = api.show.checkForStart.useQuery({ userId: user.id });
    if (!show) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No in progress show found for user!" });
    }

    //it's showtime....

  }
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Invalid show request!" });
}
