import {
  ErrorMessage,
  SuccessfulMessage,
  getResponse,
} from "@/lib/server/responses";
import { createProductService } from "@/services/server/catalog/products/creation";
import { getProductsService } from "@/services/server/catalog/products/extraction";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const products = await getProductsService({});

    return getResponse({
      status: 200,
      message: SuccessfulMessage.creation,
      data: products,
    });
  } catch (error) {
    return getResponse({
      status: 500,
      message: ErrorMessage["serverError"],
      code: "",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const productContent = await req.formData();
    await createProductService({
      data: productContent,
    });

    return getResponse({
      status: 200,
      message: SuccessfulMessage.creation,
    });
  } catch (error) {
    return getResponse({
      status: 500,
      message: ErrorMessage["serverError"],
      code: "",
    });
  }
}
