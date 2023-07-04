import fs from "fs";
import os from "os";
import { uploadFolder } from "@/lib/services/azure/serverUploader";
import { getFilesizeInBytes } from "@/lib/utils/bufferUtils";
import { generateRandomBytes } from "@/lib/utils/crypt";
import { getFilename } from "@/lib/utils/fileUtils";
import { downloadFile } from "@/lib/utils/httpUtils";
import { v4 as uuid } from "uuid";

const TEST_FILE_SIZE = 15000000;
test("test upload blob", async () => {
  //create temp directory

  const dir = `${os.tmpdir()}/tests/${uuid()}`;
  const file = `${dir}/${uuid()}.junk`;
  const testFile = `${dir}/${uuid()}.junk`;
  fs.mkdirSync(dir);
  const data = await generateRandomBytes(TEST_FILE_SIZE);
  fs.writeFileSync(file, data);
  if (!(await uploadFolder(dir, "debug", "images"))) {
    throw new Error("Failed to upload initial file");
  }

  const remoteFileUrl = `${
    process.env.AZURE_ACCOUNT_URL as string
  }/debug/images/${getFilename(file)}`;
  const newFile = await downloadFile(remoteFileUrl, testFile);

  expect(getFilesizeInBytes(newFile)).toEqual(getFilesizeInBytes(testFile));
});
