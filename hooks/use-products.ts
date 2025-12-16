"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { apiWithFallback } from "@/services/client/api-with-fallback";

interface UseProductsReturn {
  products: Product[];
  searchProducts: (search: string) => void;
  searchProductsWithImage: (file: File) => void;
  refreshProducts: () => void;
  loading: boolean;
  error: string | null;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);

  const fetchProducts = async ({
    search,
    image,
  }: {
    search?: string;
    image?: File;
  }) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (image) formData.append("image", image);

    const { data, error: fetchError } = await (image
      ? apiWithFallback.searchByImage(formData)
      : apiWithFallback.getProducts(search));

    if (fetchError) {
      setError(fetchError);
      setProducts([]);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const searchProducts = (search: string) => {
    fetchProducts({ search });
  };

  const searchProductsWithImage = (image: File) => {
    fetchProducts({ image });
  };

  const refreshProducts = () => {
    setRefresh((refresh) => refresh + 1);
  };

  useEffect(() => {
    fetchProducts({});
  }, [refresh]);

  return {
    products,
    loading,
    error,
    searchProducts,
    searchProductsWithImage,
    refreshProducts,
  };
};
