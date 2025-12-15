import { PrismaService } from "@/lib/db";

export async function getProductsRepo() {
  return PrismaService.getInstance().product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      secondaryImage: true,
      category: true,
    },
  });
}

type ProductCreateInput = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
};

export async function createProductRepo(data: ProductCreateInput) {
  return PrismaService.getInstance().product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      image: "",
      secondaryImage: "",
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
  });
}
