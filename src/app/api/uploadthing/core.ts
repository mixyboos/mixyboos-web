import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = async (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const profileImageRouter = {
  profileImageUpload: f({ image: { maxFileSize: "4MB" } })
    .middleware(async (req) => {
      const user = await auth(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type ProfileImageRouter = typeof profileImageRouter;
