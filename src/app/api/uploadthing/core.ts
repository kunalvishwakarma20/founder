import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing()

export const ourFileRouter = {
  menuItemImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => {
      return {}; // Add auth logic here if needed
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete:", file.url);
      return { url: file.url }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter