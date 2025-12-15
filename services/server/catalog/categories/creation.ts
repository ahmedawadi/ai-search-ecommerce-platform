import { createCategoryRepo } from "@/repositories/catalog/categories";

interface Params {
  data: FormData;
}

export async function createCategoryService({ data }: Params) {
  return await createCategoryRepo({
    name: data.get("name") as string,
    description: data.get("description") as string,
  });
}
