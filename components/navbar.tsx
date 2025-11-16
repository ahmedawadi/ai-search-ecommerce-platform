"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { categories } = useCategories();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border flex justify-center">
      <div className="container- w-full max-w-7xl">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                S
              </span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              ShopNow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm tracking-wide"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <Link
              href="#categories"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm tracking-wide"
            >
              Categories
            </Link>
          </div>
          {/* Search and Icons */}
          <div className="flex items-center gap-6">
            <Link
              href="/search"
              className="p-2 hover:bg-muted rounded-sm transition-colors"
              title="Search"
            >
              <Search className="w-6 h-6 text-foreground" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-sm transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-border">
            <Link
              href="/"
              className="block px-6 py-3 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <div className="px-6 py-3">
              <p className="text-sm font-semibold text-foreground mb-4">
                Categories
              </p>
              <div className="flex flex-col gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/?category=${category.id}`}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
