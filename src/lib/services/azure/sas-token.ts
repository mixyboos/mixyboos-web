import { env } from "@/env.mjs";
import {
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
  SASProtocol,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

const generateSasToken = async (accountName: string, containerName: string) => {
  const TEN_MINUTES = 10 * 60 * 1000;
  const NOW = new Date();
  const TEN_MINUTES_AGO = new Date(NOW.valueOf() - TEN_MINUTES);
  const TEN_MINUTES_TIME = new Date(NOW.valueOf() + TEN_MINUTES * 1000);

  const sharedKeyCredential = new StorageSharedKeyCredential(
    env.AZURE_ACCOUNT_NAME,
    env.AZURE_ACCOUNT_KEY
  );

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      permissions: ContainerSASPermissions.parse("racwdl"),
      startsOn: TEN_MINUTES_AGO,
      expiresOn: TEN_MINUTES_TIME,
      protocol: SASProtocol.Https,
    },
    sharedKeyCredential
  ).toString();

  return sasToken;
};

export { generateSasToken };
