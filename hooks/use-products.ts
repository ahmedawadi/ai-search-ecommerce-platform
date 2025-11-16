"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"
import { apiWithFallback } from "@/services/api-with-fallback"

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
}

export const useProducts = (search?: string): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await apiWithFallback.getProducts(search)

      if (fetchError) {
        setError(fetchError)
        setProducts([])
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [search])

  return { products, loading, error }
}
