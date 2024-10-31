import path from "path";

const getFileExtension = (fileName: string): string =>
  fileName.split(".").pop() as string;

const getFilename = (fullPath: string): string => path.basename(fullPath);

export { getFileExtension, getFilename };
