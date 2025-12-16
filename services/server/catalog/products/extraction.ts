import {
  ErrorMessage,
  SuccessfulMessage,
  getResponse,
} from "@/lib/server/responses";
import { getProductsRepo } from "@/repositories/catalog/products";
import { NextRequest } from "next/server";
import { getSimilarProductsFromAIService } from "../../external-calls/products/extraction";

interface Params {
  req: NextRequest;
}

export async function getProductsService({ req }: Params) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  try {
    const products = await getProductsRepo({
      search: search ? search : undefined,
    });

    return getResponse({
      status: SuccessfulMessage.products.creation.status,
      message: SuccessfulMessage.products.creation.message,
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

    console.log(products);

    return getResponse({
      status: SuccessfulMessage.products.extraction.status,
      message: SuccessfulMessage.products.extraction.message,
      data: products,
    });
  } catch (error) {
    console.log(error);
    return getResponse({
      status: ErrorMessage["serverError"].status,
      message: ErrorMessage["serverError"].message,
      code: ErrorMessage["serverError"].code,
    });
  }
}
