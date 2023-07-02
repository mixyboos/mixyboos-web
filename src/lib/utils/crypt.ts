import {v4 as uuidv4} from "uuid";
import * as crypto from "crypto";

const generateSecretKey = (): string | undefined =>
  crypto.createHmac("sha256", uuidv4()).digest("hex");

const generateRandomBytes = async (size: number) => {
  const buffer: crypto.BinaryLike = await new Promise((resolve, reject) => {
    crypto.randomBytes(size, function (ex, buffer) {
      if (ex) {
        reject("error generating token");
      }
      resolve(buffer);
    });
  });
  const token = crypto
    .createHash("sha1")
    .update(buffer)
    .digest("hex");

  return token;
}

export {generateSecretKey, generateRandomBytes};
