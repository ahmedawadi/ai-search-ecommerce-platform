import {
  ErrorMessage,
  SuccessfulMessage,
  getResponse,
} from "@/lib/server/responses";
import {
  deleteProductRepo,
  getProductsRepo,
} from "@/repositories/catalog/products";
import { NextRequest } from "next/server";
import { getSimilarProductsFromAIService } from "../../external-calls/products/extraction";
import { deleteProductOnAIService } from "../../external-calls/products/deletion";
import { CustomError } from "@/utils/custom-error";

interface Params {
  req: NextRequest;
}

export async function deleteProductService({ req }: Params) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId") as string;

  try {
    await deleteProductRepo({
      id: productId,
    });

    await deleteProductOnAIService({
      id: productId,
    });

    return getResponse({
      status: SuccessfulMessage.products.deletion.status,
      message: SuccessfulMessage.products.deletion.message,
    });
  } catch (error) {
    const customError = error as CustomError;

    //ai service failed to create model
    if (customError.code === "P5002")
      return getResponse({
        status: ErrorMessage.deletionFailedOnAIService.status,
        message: ErrorMessage.deletionFailedOnAIService.message,
        code: ErrorMessage.deletionFailedOnAIService.code,
      });

    return getResponse({
      status: ErrorMessage.serverError.status,
      message: ErrorMessage.serverError.message,
      code: ErrorMessage.serverError.code,
    });
  }
}

export async function getSimilarProductsImageService({ req }: Params) {
  const data = await req.formData();
  const similarImage = data.get("image") as File;

  try {
    const res = await getSimilarProductsFromAIService({
      image: similarImage,
    });

    const products = await getProductsRepo({
      productsIds: res.productsIds,
    });

    return getResponse({
      status: SuccessfulMessage.products.extraction.status,
      message: SuccessfulMessage.products.extraction.message,
      data: products,
    });
  } catch (error) {
    return getResponse({
      status: ErrorMessage["serverError"].status,
      message: ErrorMessage["serverError"].message,
      code: ErrorMessage["serverError"].code,
    });
  }
}
