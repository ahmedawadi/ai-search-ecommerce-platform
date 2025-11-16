"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { ProductsSection } from "@/components/products-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background">
      <Navbar />
      <div className="max-w-7xl w-full flex flex-col space-y-10">
        <HeroSection />
        <CategoriesSection />
        <ProductsSection />
      </div>
      <Footer />
    </div>
  );
}
