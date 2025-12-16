import { getSimilarProductsImageService } from "@/services/server/catalog/products/extraction";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await getSimilarProductsImageService({ req });
}
