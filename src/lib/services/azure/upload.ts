import fs from "fs";
import { BlobServiceClient, type ContainerClient } from "@azure/storage-blob";

const createBlobInContainer = async (
  file: File,
  containerName: string,
  fileName: string,
  token: string
) => {
  const uploadUrl = `https://mixyboos.blob.core.windows.net/?${token}`;
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

const uploadFolder = (
  token: string,
  dir: string,
  container: string,
  subFolder: string
) => {
  fs.readdir(dir, (resolve, reject) => {
    console.log("upload", "uploadFolder", resolve, reject);
  });
};
export { uploadFile, uploadFolder };
