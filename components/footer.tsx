"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ShoppingBag } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-primary-foreground flex justify-center">
      <div className="border-t-2 border-accent w-full max-w-7xl">
        {/* Main Footer Content */}
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 py-24 border-b border-muted/30">
            {/* Brand */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-foreground  rounded-sm flex items-center justify-center shadow-lg">
                  <ShoppingBag className="text-primary w-6 h-6" />
                </div>
                <span className="font-bold text-2xl">ShopNow</span>
              </div>
              <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
                Your destination for premium products and exceptional shopping
                experiences delivered with care and excellence.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-8">
              <h3 className="font-bold text-primary-foreground text-lg">
                Quick Links
              </h3>
              <ul className="space-y-6">
                <li>
                  <Link
                    href="/"
                    className="text-primary-foreground/60 hover:text-accent transition-colors font-medium text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="text-primary-foreground/60 hover:text-accent transition-colors font-medium text-sm"
                  >
                    Search Products
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/60 hover:text-accent transition-colors font-medium text-sm"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/60 hover:text-accent transition-colors font-medium text-sm"
                  >
                    Best Sellers
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-8">
              <h3 className="font-bold text-primary-foreground text-lg">
                Support
              </h3>
              <ul className="space-y-6">
                <li>
                  <a
                    href="mailto:info@shopnow.com"
                    className="text-primary-foreground/60 hover:text-accent transition-colors font-medium text-sm"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/60 hover:text-accent transition-colors font-medium text-sm"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/60 hover:text-accent transition-colors font-medium text-sm"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/60 hover:text-accent transition-colors font-medium text-sm"
                  >
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-8">
              <h3 className="font-bold text-primary-foreground text-lg">
                Get in Touch
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-primary-foreground/60 text-xs font-medium mb-2">
                      Phone
                    </span>
                    <span className="text-primary-foreground text-sm font-medium">
                      +1 (555) 123-4567
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-primary-foreground/60 text-xs font-medium mb-2">
                      Email
                    </span>
                    <span className="text-primary-foreground text-sm font-medium">
                      info@shopnow.com
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-primary-foreground/60 text-xs font-medium mb-2">
                      Address
                    </span>
                    <span className="text-primary-foreground text-sm font-medium">
                      123 Tech Street, City, State
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-muted/30 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-primary-foreground/60 text-sm font-medium">
              &copy; {currentYear} ShopNow. All rights reserved.
            </p>
            <div className="flex items-center gap-12">
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </footer>
  );
}
