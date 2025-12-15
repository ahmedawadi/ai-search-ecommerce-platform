"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/lib/types";
import { apiWithFallback } from "@/services/client/api-with-fallback";

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await apiWithFallback.getCategories();

      if (fetchError) {
        setError(fetchError);
        setCategories([]);
      } else {
        setCategories(data || []);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
