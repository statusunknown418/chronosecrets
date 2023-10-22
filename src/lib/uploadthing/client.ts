import { generateComponents } from "@uploadthing/react";
import { OurFileRouter } from "./core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
