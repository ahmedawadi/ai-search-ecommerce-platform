import { createCategoryRepo } from "@/repositories/catalog/categories";
import { NextRequest } from "next/server";
import path from "path";
import fs from "fs";
import { storeFileInServer } from "@/utils/file-storage";
import {
  ErrorMessage,
  SuccessfulMessage,
  getResponse,
} from "@/lib/server/responses";

interface Params {
  req: NextRequest;
}

export async function createCategoryService({ req }: Params) {
  const data = await req.formData();
  const image = data.get("image") as File;
  const uploadDir = path.join(
    process.cwd(),
    "public/uploads/images/categories"
  );

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const { path: imagePath } = await storeFileInServer({
    fileName: image.name,
    file: image,
  });

  try {
    await createCategoryRepo({
      name: data.get("name") as string,
      description: data.get("description") as string,
      image: imagePath,
    });

    return getResponse({
      status: SuccessfulMessage.categories.creation.status,
      message: SuccessfulMessage.categories.creation.message,
    });
  } catch (error) {
    console.log(error);
    return getResponse({
      status: ErrorMessage.serverError.status,
      message: ErrorMessage.serverError.message,
      code: ErrorMessage.serverError.code,
    });
  }
}
