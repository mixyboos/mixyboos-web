import { env } from "@/env.mjs";
import { BlobServiceClient } from "@azure/storage-blob";

const uploadFile = async (
  file: File,
  fileName: string,
  containerName: string
): Promise<string | undefined> => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    env.AZURE_CONNECTION
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(fileName);
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  const response = await blobClient.uploadData(file, options);

  console.log("upload", "uploadFile_response", response);

  return response.errorCode;
};
