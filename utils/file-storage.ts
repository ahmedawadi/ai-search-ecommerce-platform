import path from "path";
import { v4 as uuid } from "uuid";
import fs from "fs";

interface Params {
  fileName: string;
  file: File;
}

export async function storeFileInServer({ fileName, file }: Params) {
  const uploadDir = path.join(process.cwd(), "public/uploads/images");

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const fileUuid = uuid();
  const fileExt = path.extname(fileName);
  const storedFileName = `${fileUuid}${fileExt}`;
  const storedFilePath = path.join(uploadDir, storedFileName);
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(storedFilePath, fileBuffer);

  return { path: storedFilePath };
}
