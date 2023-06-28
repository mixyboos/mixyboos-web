import { env } from "@/env.mjs";
import {
  BlockBlobClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

const uploadFile = (container: string) => {
  const client = new BlockBlobClient(
    `${env.AZURE_ACCOUNT_URL}/${container}`,
    new StorageSharedKeyCredential(
      env.AZURE_ACCOUNT_NAME,
      env.AZURE_ACCOUNT_KEY
    )
  );

};

// const uploadFolder = (dir: string, container: string, subFolder: string) => {
//   fs.readdir(dir, (err, files) => {
//     console.log("upload", "uploadFolder", err, files);

//     files.forEach((file) => {
//       const f = new File(file);
//       uploadFile(f, containerName, `${subFolder}/${f.name}`)
//         .then((r) => {
//           console.log("upload", "File uploaded", r);
//         })
//         .catch((err) => {
//           console.log("upload", "Error uploading", err);
//         });
//     });
//   });
// };

export { uploadFolder };
