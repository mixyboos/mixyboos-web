import { v4 as uuidv4 } from "uuid";
import * as crypto from "crypto";

const generateSecretKey = (): string | undefined =>
  crypto.createHmac("sha256", uuidv4()).digest("hex");

export { generateSecretKey };
