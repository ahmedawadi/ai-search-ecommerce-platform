"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fallingElements, setFallingElements] = useState<
    Array<{ id: number; left: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    setIsLoaded(true);

    const elements = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 1.5,
    }));
    setFallingElements(elements);
  }, []);

  return (
    <section className="relative w-full bg-background overflow-hidden">
      {fallingElements.map((el) => (
        <div
          key={el.id}
          className="absolute w-1 h-1 bg-accent rounded-full"
          style={{
            left: `${el.left}%`,
            top: "-20px",
            opacity: 0.6,
            animation: `fall ${el.duration}s ease-in forwards`,
            animationDelay: `${el.delay}s`,
            boxShadow: "0 0 6px var(--accent)",
          }}
        />
      ))}

      {/* Animated Background Gradient Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/5 rounded-full -mb-40 blur-3xl animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div
        className="h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-0 animate-fade-in"
        style={{ animationDuration: "1s" }}
      ></div>

      <div className="container-custom py-4 flex flex-col justify-center relative z-10">
        <div className="">
          <div
            className={`mb-12 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full hover:bg-accent/15 transition-colors duration-300">
              Welcome to ShopNow
            </span>
          </div>

          <h1
            className={`text-6xl font-bold text-foreground mb-12 leading-tight text-balance transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Discover Premium <br />
            <span className="relative inline-block">
              Shopping Experience
              <svg
                className={`absolute bottom-0 left-0 w-full h-3 text-accent transition-all duration-1000 ${
                  isLoaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-95"
                }`}
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                style={{ transformOrigin: "left" }}
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

          <p
            className={`text-xl md:text-2xl text-muted-foreground mb-20 text-balance leading-relaxed max-w-3xl transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Carefully curated products from around the world. Shop with
            confidence and discover premium quality, exceptional service, and
            unbeatable prices.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-6 items-start transition-all duration-1000 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/#products"
              className="group relative px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1"
            >
              <span className="relative z-10">Explore Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/search"
              className="group relative px-8 py-4 text-lg font-semibold text-foreground bg-secondary border-2 border-foreground rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1"
            >
              <span className="relative z-10">Search & Discover</span>
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          <div
            className={`w-full mt-20 pt-10 border-t border-border grid grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <StatItem
              number="10K+"
              label="Premium Products"
              delay={600}
              isLoaded={isLoaded}
            />
            <StatItem
              number="50K+"
              label="Happy Customers"
              delay={700}
              isLoaded={isLoaded}
            />
            <StatItem
              number="24/7"
              label="Customer Support"
              delay={800}
              isLoaded={isLoaded}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-0 animate-fade-in"
        style={{ animationDuration: "1s", animationDelay: "0.3s" }}
      ></div>
    </section>
  );
}

function StatItem({
  number,
  label,
  delay,
  isLoaded,
}: {
  number: string;
  label: string;
  delay: number;
  isLoaded: boolean;
}) {
  return (
    <div
      className={`w-full flex flex-col items-center transition-all duration-1000 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
        {number}
      </p>
      <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {label}
      </p>
    </div>
  );
}
