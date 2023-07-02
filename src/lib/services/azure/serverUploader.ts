import fs from "fs/promises";
import path from "path";
import * as Sentry from "@sentry/nextjs";

import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { StatusCodes } from "http-status-codes";

const uploadFile = async (
  file: string,
  container: string,
  destination: string
): Promise<boolean> => {
  const client = new BlobServiceClient(
    `${process.env.AZURE_ACCOUNT_URL as string}`,
    new StorageSharedKeyCredential(
      process.env.AZURE_ACCOUNT_NAME as string,
      process.env.AZURE_ACCOUNT_KEY as string
    )
  );
  const containerClient = client.getContainerClient(container);
  const blockBlobClient = containerClient.getBlockBlobClient(destination);

  const response = await blockBlobClient.uploadFile(file);
  return response._response.status === StatusCodes.OK;
};

const uploadFolder = async (
  dir: string,
  container: string,
  subFolder: string
) => {
  const files = await fs.readdir(dir);
  console.log("upload", "uploadFolder", files);
  for (const file of files) {
    try {
      const destinationFile = path.join(subFolder, file);
      const r = await uploadFile(
        path.join(dir, file),
        container,
        destinationFile
      );
      console.log("upload", "File uploaded", r);
    } catch (err) {
      Sentry.captureException(err);
      console.log("upload", "Error uploading", err);
      return false;
    }
  }
  return true;
};

export { uploadFolder, uploadFile };
