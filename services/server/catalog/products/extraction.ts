import { getProductsRepo } from "@/repositories/catalog/products";

interface Params {}

export async function getProductsService({}: Params) {
  return await getProductsRepo();
}
