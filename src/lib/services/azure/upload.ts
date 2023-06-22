import { BlobServiceClient, type ContainerClient } from "@azure/storage-blob";

const createBlobInContainer = async (
  file: File,
  containerName: string,
  fileName: string,
  token: string
) => {
  // token =
  //   "sp=racwdl&st=2023-06-20T17:56:24Z&se=2023-06-21T01:56:24Z&spr=https&sv=2022-11-02&sr=c&sig=Y0pZfpoTAat%2FJsgZD9fNQBOB1hAgfP5GfB6iERWFmck%3D";
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

export { uploadFile };
