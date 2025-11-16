import axios, { type AxiosInstance } from "axios"

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS || "http://localhost:5000/api"

const apiClient: AxiosInstance = axios.create({
  baseURL: BACKEND_ADDRESS,
  timeout: 10000,
})

export const api = {
  // Products
  getProducts: async (search?: string) => {
    try {
      const params = search ? { search } : {}
      const response = await apiClient.get("/products", { params })
      return { data: response.data, error: null }
    } catch (error) {
      console.error("Error fetching products:", error)
      return { data: null, error: "Failed to fetch products" }
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const response = await apiClient.get("/categories")
      return { data: response.data, error: null }
    } catch (error) {
      console.error("Error fetching categories:", error)
      return { data: null, error: "Failed to fetch categories" }
    }
  },

  // Image Search
  searchByImage: async (formData: FormData) => {
    try {
      const response = await apiClient.post("/products/search-by-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return { data: response.data, error: null }
    } catch (error) {
      console.error("Error searching by image:", error)
      return { data: null, error: "Failed to search by image" }
    }
  },
}
