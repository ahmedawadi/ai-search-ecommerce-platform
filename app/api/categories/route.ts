import { createCategoryService } from "@/services/server/catalog/categories/creation";
import { getCategoriesService } from "@/services/server/catalog/categories/extraction";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getCategoriesService();
}

export async function POST(req: NextRequest) {
  return await createCategoryService({
    req,
  });
}
