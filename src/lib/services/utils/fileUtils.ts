const getFileExtension = (fileName: string): string =>
  fileName.split(".").pop() as string;

const getFileNameFromInput = (fullPath: string): string => {
  const startIndex =
    fullPath.indexOf("\\") >= 0
      ? fullPath.lastIndexOf("\\")
      : fullPath.lastIndexOf("/");
  let filename = fullPath.substring(startIndex);
  if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
    filename = filename.substring(1);
  }
  return filename.replace(/\.[^/.]+$/, "");
};
export { getFileExtension, getFileNameFromInput };
