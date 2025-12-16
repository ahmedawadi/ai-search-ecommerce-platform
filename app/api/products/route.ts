import { createProductService } from "@/services/server/catalog/products/creation";
import { deleteProductService } from "@/services/server/catalog/products/deletion";
import { getProductsService } from "@/services/server/catalog/products/extraction";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getProductsService({ req });
}

export async function DELETE(req: NextRequest) {
  return await deleteProductService({ req });
}

export async function POST(req: NextRequest) {
  return await createProductService({
    req,
  });
}
