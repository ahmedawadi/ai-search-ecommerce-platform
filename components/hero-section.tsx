"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* Background Gradient Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -mr-48 -mt-48 opacity-60"></div>

      {/* Top Accent Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <div className="container-custom py-4 flex flex-col justify-center relative z-10">
        <div className="">
          {/* Subtitle */}
          <div className="mb-12">
            <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full">
              Welcome to ShopNow
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl  font-bold text-foreground mb-12 leading-tight text-balance">
            Discover Premium <br />
            <span className="relative">
              Shopping Experience
              <svg
                className="absolute bottom-0 left-0 w-full h-3 text-accent"
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,10 Q75,0 150,10 T300,10"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-20 text-balance leading-relaxed max-w-3xl">
            Carefully curated products from around the world. Shop with
            confidence and discover premium quality, exceptional service, and
            unbeatable prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Link
              href="/#products"
              className="btn-primary text-center font-semibold px-8 py-4 text-lg transition-all duration-300 hover:shadow-lg"
            >
              Explore Products
            </Link>
            <Link
              href="/search"
              className="btn-secondary text-center font-semibold px-8 py-4 text-lg border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Search & Discover
            </Link>
          </div>

          {/* Stats */}
          <div className="w-full mt-20 pt-10 border-t border-border grid grid-cols-3 gap-8">
            <div className="w-full flex flex-col items-center">
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                10K+
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Premium Products
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                50K+
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Happy Customers
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                24/7
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Customer Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </section>
  );
}
