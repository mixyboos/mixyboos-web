///
// synchronous file downloader for use in tests
///
import fs from "fs";
import fetch from "node-fetch";

const downloadFile = async (url: string, path: string) => {
  const response = await fetch(url);
  const bytes = await response.arrayBuffer();
  fs.writeFileSync(path, Buffer.from(bytes));

  return path;
};

export { downloadFile };
