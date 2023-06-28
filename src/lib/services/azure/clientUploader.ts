import { env } from "@/env.mjs";
import { BlobServiceClient, type ContainerClient } from "@azure/storage-blob";

const createBlobInContainer = async (
  file: File,
  containerName: string,
  fileName: string,
  token: string
) => {
  const uploadUrl = `${env.AZURE_ACCOUNT_URL}/?${token}`;
  const blobService = new BlobServiceClient(uploadUrl);

  const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);

  const blobClient = containerClient.getBlockBlobClient(fileName);
  const options = { blobHTTPHeaders: { blobContentType: file.type } };
  const result = await blobClient.uploadData(file, options);
  console.log("upload", "createBlobInContainer", result);
};

const uploadFile = async (
  file: File,
  containerName: string,
  fileName: string,
  token: string
): Promise<string | undefined> => {
  await createBlobInContainer(
    file,
    containerName,
    fileName.toLowerCase(),
    token
  );

  return fileName;
};

export { uploadFile };
