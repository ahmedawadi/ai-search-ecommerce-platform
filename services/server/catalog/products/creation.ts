import { createProductRepo } from "@/repositories/catalog/products";
import { storeFileInServer } from "@/utils/file-storage";
import { NextRequest } from "next/server";
import { createProductOnAIService } from "../../external-calls/products/creation";
import { CustomError } from "@/utils/custom-error";
import {
  ErrorMessage,
  SuccessfulMessage,
  getResponse,
} from "@/lib/server/responses";

interface Params {
  req: NextRequest;
}

export async function createProductService({ req }: Params) {
  const data = await req.formData();
  const productImage = data.get("image") as File;
  const secondaryProductImage = data.get("secondaryImage") as File;

  const { path: imagePath } = await storeFileInServer({
    fileName: productImage.name,
    file: productImage,
  });
  const { path: secondaryImagePath } = await storeFileInServer({
    fileName: secondaryProductImage.name,
    file: secondaryProductImage,
  });

  try {
    const res = await createProductRepo({
      name: data.get("name") as string,
      description: data.get("description") as string,
      price: Number(data.get("price")),
      image: imagePath,
      secondaryImage: secondaryImagePath,
      categoryId: data.get("categoryId") as string,
    });

    await createProductOnAIService({
      data: {
        image: secondaryProductImage,
        productId: res.id,
      },
    });

    return getResponse({
      status: SuccessfulMessage.products.creation.status,
      message: SuccessfulMessage.products.creation.message,
    });
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;

    //ai service failed to create model
    if (customError.code === "P5001")
      return getResponse({
        status: ErrorMessage.creationFailedOnAIService.status,
        message: ErrorMessage.creationFailedOnAIService.message,
        code: ErrorMessage.creationFailedOnAIService.code,
      });

    return getResponse({
      status: ErrorMessage.serverError.status,
      message: ErrorMessage.serverError.message,
      code: ErrorMessage.serverError.code,
    });
  }
}
