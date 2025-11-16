"use client";
import { Suspense, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { ProductCard } from "@/components/product-card";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/lib/types";
import { Loader2, AlertCircle } from "lucide-react";

function SearchPageContent() {
  const [imageResults, setImageResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { products, loading, error } = useProducts(undefined);

  const displayProducts = imageResults.length > 0 ? imageResults : products;
  const isLoading = loading || isSearching;

  const handleImageSearch = (results: Product[]) => {
    setImageResults(results);
  };

  return (
    <div className="min-h-screen  w-full bg-background flex flex-col items-center">
      <Navbar />

      {/* Hero Section */}
      <div className="w-full max-w-7xl ">
        <div className="border-b border-border">
          <div className="container-custom py-10">
            <div className="max-w-3xl">
              <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                Discover Products
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Use our powerful search tools to find exactly what you're
                looking for. Search by name or upload an image to discover
                similar items instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="container-custom py-10">
          <div className="bg-card rounded-lg border border-border p-10">
            <SearchBar
              onImageSearch={handleImageSearch}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="container-custom py-16 flex-1">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-32">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <Loader2 className="w-12 h-12 text-foreground animate-spin" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-lg">
                    Searching products...
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    This may take a few moments
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-12 text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
              <div>
                <h3 className="font-bold text-destructive text-lg mb-2">
                  Search Error
                </h3>
                <p className="text-destructive/80">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && displayProducts.length === 0 && (
            <div className="text-center py-32">
              <div className="bg-muted w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-3 text-2xl">
                No Products Found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-lg">
                {true
                  ? `Try different keywords or upload an image to search.`
                  : "Enter a search term or upload an image to find products."}
              </p>
            </div>
          )}

          {/* Results Grid */}
          {!isLoading && displayProducts.length > 0 && (
            <div className="space-y-12">
              <div className="flex items-center gap-4 pb-8 border-b border-border">
                <div>
                  <p className="text-muted-foreground">
                    Found{" "}
                    <span className="text-foreground font-bold text-lg">
                      {displayProducts.length}
                    </span>{" "}
                    products
                    {true && (
                      <span className="text-muted-foreground">
                        {" "}
                        matching "
                        <span className="font-semibold text-foreground">
                          {"search"}
                        </span>
                        "
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-foreground animate-spin" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
