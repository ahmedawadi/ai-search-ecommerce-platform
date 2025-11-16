"use client";

import type { Product } from "@/lib/types";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group bg-card rounded-sm border border-border hover:border-muted-foreground transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div
        className="relative h-80 overflow-hidden bg-muted"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={
            isHovered && product.secondaryImage
              ? product.secondaryImage
              : product.image
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
          <button className="w-4/5 flex items-center justify-center gap-2 bg-card text-card-foreground px-6 py-3 rounded-sm font-semibold hover:bg-muted transition-colors duration-200 shadow-lg">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-semibold text-foreground mb-4 line-clamp-2 group-hover:text-muted-foreground transition-colors text-base">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-8 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
          <span className="text-xs text-muted-foreground ml-2">
            (128 reviews)
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <div className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </div>
          <button className="text-accent hover:text-accent/80 font-semibold text-sm transition-colors">
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}
