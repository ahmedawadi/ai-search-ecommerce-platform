import { api } from "./api"
import { fakeDataService } from "./fake-data-service"

// Flag to use fake data for development
const USE_FAKE_DATA = process.env.NEXT_PUBLIC_USE_FAKE_DATA !== "false"

export const apiWithFallback = {
  getProducts: async (search?: string) => {
    if (USE_FAKE_DATA) {
      try {
        const data = await fakeDataService.getProducts(search)
        return { data, error: null }
      } catch (error) {
        return { data: null, error: "Failed to fetch products" }
      }
    }

    return api.getProducts(search)
  },

  getCategories: async () => {
    if (USE_FAKE_DATA) {
      try {
        const data = await fakeDataService.getCategories()
        return { data, error: null }
      } catch (error) {
        return { data: null, error: "Failed to fetch categories" }
      }
    }

    return api.getCategories()
  },

  searchByImage: async (formData: FormData) => {
    if (USE_FAKE_DATA) {
      try {
        const data = await fakeDataService.searchByImage()
        return { data, error: null }
      } catch (error) {
        return { data: null, error: "Failed to search by image" }
      }
    }

    return api.searchByImage(formData)
  },
}
