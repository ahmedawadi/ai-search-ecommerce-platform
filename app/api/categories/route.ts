import {
  ErrorMessage,
  SuccessfulMessage,
  getResponse,
} from "@/lib/server/responses";
import { createCategoryService } from "@/services/server/catalog/categories/creation";
import { getCategoriesService } from "@/services/server/catalog/categories/extraction";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categories = await getCategoriesService({});

    return getResponse({
      status: 200,
      message: SuccessfulMessage.creation,
      data: categories,
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
    const categoryContent = await req.formData();
    await createCategoryService({
      data: categoryContent,
    });

    return getResponse({
      status: 200,
      message: SuccessfulMessage.creation,
    });
  } catch (error) {
    console.log(error);
    return getResponse({
      status: 500,
      message: ErrorMessage["serverError"],
      code: "",
    });
  }
}
