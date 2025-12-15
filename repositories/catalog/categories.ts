import { PrismaService } from "@/lib/db";

export async function getCategoriesRepo() {
  return await PrismaService.getInstance().category.findMany({
    select: {
      id: true,
      name: true,
      description: true,

      image: true,
    },
  });
}

type CategoryCreateInput = {
  name: string;
  description: string;
};

export async function createCategoryRepo(data: CategoryCreateInput) {
  console.log("data");
  return await PrismaService.getInstance().category.create({
    data: {
      name: data.name,
      description: data.description,
      image: "",
    },
  });
}
