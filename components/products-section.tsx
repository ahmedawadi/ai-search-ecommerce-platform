"use client";

import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product-card";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export function ProductsSection() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { products, loading, error } = useProducts(search || undefined);

  return (
    <section id="products" className="py-5 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 text-center">
          {/* Updated to use shadcn colors */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Discover our Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {search
              ? `Results for "${search}"`
              : "Handpicked selection of premium products curated just for you"}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="text-center">
              {/* Updated spinner color */}
              <Loader2 className="w-10 h-10 text-foreground animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                Loading products...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-sm p-8 text-center">
            <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
            <h3 className="font-semibold text-destructive mb-2">
              Unable to Load Products
            </h3>
            <p className="text-destructive/80">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-24">
            <div className="bg-muted w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-3 text-lg">
              No Products Found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              {search
                ? `No products match your search. Try different keywords.`
                : "No products available at the moment."}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && !error && products.length > 0 && (
          <div className="flex justify-center mt-16">
            <Link href="/search">View All Products</Link>
          </div>
        )}
      </div>
    </section>
  );
}
