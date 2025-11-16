"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Upload, X, Sparkles } from "lucide-react";

interface SearchBarProps {
  onImageSearch?: (products: any[]) => void;
  isSearching?: boolean;
  setIsSearching?: (value: boolean) => void;
}

export function SearchBar({
  onImageSearch,
  isSearching,
  setIsSearching,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleTextSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImage(e.dataTransfer.files[0]);
    }
  };

  const handleImageSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;

    setIsSearching?.(true);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/search/image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onImageSearch?.(data.products);
        router.push("/search?type=image");
      }
    } catch (error) {
      console.error("Error searching by image:", error);
    } finally {
      setIsSearching?.(false);
    }
  };

  const clearImageSearch = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="w-full space-y-16">
      {/* Text Search Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-foreground" />
          <h2 className="text-2xl font-bold text-foreground">Search by Name</h2>
        </div>
        <form onSubmit={handleTextSearch} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base placeholder-muted-foreground"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-6">
        <div className="flex-1 h-px bg-border"></div>
        <span className="text-muted-foreground text-sm font-medium">Or</span>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      {/* Image Search Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-foreground" />
          <h2 className="text-2xl font-bold text-foreground">
            Search by Image
          </h2>
          <span className="ml-auto text-xs font-semibold text-accent-foreground bg-accent px-3 py-1 rounded-full">
            AI Powered
          </span>
        </div>
        <form onSubmit={handleImageSearch} className="space-y-6">
          {imagePreview ? (
            <div className="relative">
              <div className="relative bg-muted rounded-lg overflow-hidden border-2 border-border p-6">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={clearImageSearch}
                  className="absolute top-8 right-8 bg-card rounded-full p-2 hover:bg-muted border-2 border-border transition-all shadow-lg text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Ready to search? Click the button below to find similar
                products.
              </p>
            </div>
          ) : (
            <label
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center w-full p-12 border-3 border-dashed rounded-lg cursor-pointer transition-all ${
                dragActive
                  ? "border-primary bg-muted"
                  : "border-border hover:border-primary hover:bg-muted"
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <Upload className="w-8 h-8 text-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">
                    Upload an image
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Drag and drop or click to browse
                  </p>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}

          <button
            type="submit"
            disabled={!imageFile || isSearching}
            className="w-full px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSearching ? "Searching..." : "Search by Image"}
          </button>
        </form>
      </div>
    </div>
  );
}
