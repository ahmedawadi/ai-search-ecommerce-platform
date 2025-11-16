import type { Product, Category } from "@/lib/types"
import { fakeProducts } from "@/fake-data/products"
import { fakeCategories } from "@/fake-data/categories"

export const fakeDataService = {
  getProducts: async (search?: string): Promise<Product[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (search) {
      const searchLower = search.toLowerCase()
      return fakeProducts.filter(
        (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
      )
    }
    return fakeProducts
  },

  getCategories: async (): Promise<Category[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return fakeCategories
  },

  searchByImage: async (): Promise<Product[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    // Return random products as if they were matched by image similarity
    return fakeProducts.sort(() => 0.5 - Math.random()).slice(0, 4)
  },
}
