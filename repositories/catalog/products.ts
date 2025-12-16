import { PrismaService } from "@/lib/db";

interface Params {
  productsIds?: string[];
  search?: string;
}

export async function getProductsRepo({ productsIds, search }: Params) {
  if (productsIds)
    return await PrismaService.getInstance().product.findMany({
      where: {
        id: {
          in: productsIds,
        },
      },
    });
  if (search)
    return await PrismaService.getInstance().product.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

  return await PrismaService.getInstance().product.findMany({
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

  image: string;
  secondaryImage: string;

  categoryId: string;
};

export async function createProductRepo(data: ProductCreateInput) {
  return PrismaService.getInstance().product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      secondaryImage: data.secondaryImage,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
  });
}

export async function deleteProductRepo({ id }: { id: string }) {
  return PrismaService.getInstance().product.delete({
    where: {
      id,
    },
  });
}
