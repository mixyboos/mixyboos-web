const getFileExtension = (fileName: string): string =>
  fileName.split('.').pop() as string

const getFilename = (fileName: string): string => {
  const parts = fileName.split('/')
  return parts[parts.length - 1]
}
export { getFileExtension, getFilename }
