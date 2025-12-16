import { api } from "./api";

// Flag to use fake data for development

export const apiWithFallback = {
  getProducts: async (search?: string) => {
    return api.getProducts(search);
  },

  getCategories: async () => {
    return api.getCategories();
  },

  searchByImage: async (formData: FormData) => {
    try {
      const res = await api.searchByImage(formData);
      return { data: res.data, error: null };
    } catch (error) {
      return { data: null, error: "Failed to search by image" };
    }
  },
};
