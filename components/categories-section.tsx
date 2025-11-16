"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/use-categories";
import { Loader2 } from "lucide-react";

export function CategoriesSection() {
  const { categories, loading, error } = useCategories();

  return (
    <section
      id="categories"
      className="py-5 bg-background border-b border-border"
    >
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated collections of premium products.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-foreground animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-sm p-8 text-center">
            <p className="text-destructive font-medium">{error}</p>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/?category=${category.id}`}
                className="group relative overflow-hidden rounded-sm bg-muted aspect-square flex flex-col items-center justify-center text-center p-6 hover:bg-muted/80 transition-all duration-300"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={
                      category.image ||
                      "/placeholder.svg?height=400&width=400&query=product%20category"
                    }
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <h3 className="text-2xl font-bold text-primary-foreground leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-sm text-primary-foreground/80 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No categories available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
