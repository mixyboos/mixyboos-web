import crypto from "crypto";
import fs from "fs";

export const createTempFile = (file: string, size: number) => {
  console.log(`Writing ${size} bytes`);

  const writer = fs.createWriteStream(file);

  writetoStream(size, () => console.log(`File created: ${file}`));

  function writetoStream(bytesToWrite: number, callback: () => void) {
    const step = 1000;
    let i = bytesToWrite;
    write();
    function write() {
      let ok = true;
      do {
        const chunkSize = i > step ? step : i;
        const buffer = crypto.randomBytes(chunkSize);

        i -= chunkSize;
        if (i === 0) {
          // Last time!
          writer.write(buffer, callback);
        } else {
          // See if we should continue, or wait.
          // Don't pass the callback, because we're not done yet.
          ok = writer.write(buffer);
        }
      } while (i > 0 && ok);

      if (i > 0) {
        // Had to stop early!
        // Write some more once it drains.
        writer.once("drain", write);
      }
    }
  }
};
export const getFilesizeInBytes = (filename: string) => {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

export const getTestFixtureAudioBuffer = () =>
  "/srv/dev/mixyboos/working/media/15 minute sine.mp3";
