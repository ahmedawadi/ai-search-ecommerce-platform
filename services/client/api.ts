import { Category, Product } from "@/lib/types";
import axios from "axios";

export const api = {
  // Products
  getProducts: async (search?: string) => {
    try {
      const params = search ? { search } : {};
      const response = await axios.get("/api/products", { params });
      return {
        data: (response.data.data as Product[]).map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image.includes("public")
            ? product.image.split("public")[1]
            : product.image,
          secondaryImage: product.secondaryImage.includes("public")
            ? product.secondaryImage.split("public")[1]
            : product.secondaryImage,
        })),
        error: null,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      return { data: null, error: "Failed to fetch products" };
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const response = await axios.get("/api/categories");
      console.log(response.data);
      return {
        data: (response.data.data as Category[]).map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          image: category.image.includes("public")
            ? category.image.split("public")[1]
            : category.image,
        })),
        error: null,
      };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { data: null, error: "Failed to fetch categories" };
    }
  },

  // Image Search
  searchByImage: async (formData: FormData) => {
    try {
      const response = await axios.post("/api/products/search", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        data: (response.data.data as Product[]).map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image.includes("public")
            ? product.image.split("public")[1]
            : product.image,
          secondaryImage: product.secondaryImage.includes("public")
            ? product.secondaryImage.split("public")[1]
            : product.secondaryImage,
        })),
        error: null,
      };
    } catch (error) {
      console.error("Error searching by image:", error);
      return { data: null, error: "Failed to search by image" };
    }
  },
};
