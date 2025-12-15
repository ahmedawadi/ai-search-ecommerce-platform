import { createProductRepo } from "@/repositories/catalog/products";

interface Params {
  data: FormData;
}

export async function createProductService({ data }: Params) {
  const productPriceInFormData = data.get("price");

  return await createProductRepo({
    name: data.get("name") as string,
    description: data.get("description") as string,
    price: Number(productPriceInFormData),

    categoryId: data.get("categoryId") as string,
  });
}
