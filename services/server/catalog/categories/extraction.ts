import { getCategoriesRepo } from "@/repositories/catalog/categories";

interface Params {}

export async function getCategoriesService({}: Params) {
  return await getCategoriesRepo();
}
