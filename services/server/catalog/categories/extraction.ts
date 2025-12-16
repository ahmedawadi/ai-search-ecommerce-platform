import {
  ErrorMessage,
  SuccessfulMessage,
  getResponse,
} from "@/lib/server/responses";
import { getCategoriesRepo } from "@/repositories/catalog/categories";

export async function getCategoriesService() {
  try {
    const categories = await getCategoriesRepo();

    return getResponse({
      status: SuccessfulMessage.categories.extraction.status,
      message: SuccessfulMessage.categories.extraction.message,
      data: categories,
    });
  } catch (error) {
    return getResponse({
      status: ErrorMessage.serverError.status,
      message: ErrorMessage.serverError.message,
      code: ErrorMessage.serverError.code,
    });
  }
}
