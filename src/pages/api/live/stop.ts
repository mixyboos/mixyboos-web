import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process a POST request
    const { name: streamKey } = req.body as { name: string };

  }
  res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Invalid show request!" });
}
