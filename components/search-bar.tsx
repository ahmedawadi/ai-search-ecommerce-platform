"use client";

import type React from "react";
import { useState } from "react";
import { Search, Upload, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onImageSearch: (image: File) => void;
  isSearching?: boolean;
  onRemoveImage: () => void;
}

export function SearchBar({
  onSearch,
  onImageSearch,
  isSearching = false,
  onRemoveImage,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /* ---------------- Image Handling ---------------- */
  const processImage = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;
    onImageSearch(imageFile);
  };

  const clearImageSearch = () => {
    setImageFile(null);
    setImagePreview(null);
    onRemoveImage();
  };

  return (
    <div className="w-full space-y-16">
      {/* ---------- Text Search ---------- */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-foreground" />
          <h2 className="text-2xl font-bold text-foreground">Search by Name</h2>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands, or categories..."
            className="flex-1 px-6 py-4 border rounded-lg"
          />

          <Button
            onClick={() => onSearch(searchQuery)}
            className="px-8 py-4 h-full bg-primary text-primary-foreground rounded-lg cursor-pointer"
          >
            Search
          </Button>
        </div>
      </div>

      {/* ---------- Divider ---------- */}
      <div className="flex items-center gap-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-foreground text-sm">Or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* ---------- Image Search ---------- */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Search by Image</h2>
        </div>

        <div onSubmit={handleImageSubmit} className="space-y-6">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full object-cover rounded-lg"
              />
              <Button
                onClick={clearImageSearch}
                variant="ghost"
                className="absolute top-4 right-4 bg-white p-2 rounded-full"
              >
                <X />
              </Button>
            </div>
          ) : (
            <label
              className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer border-border`}
            >
              <Upload className="w-8 h-8" />
              <p className="mt-2">Upload an image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}

          <Button
            onClick={handleImageSubmit}
            disabled={!imageFile || isSearching}
            className="w-full cursor-pointer"
          >
            {isSearching ? "Searching..." : "Search by Image"}
          </Button>
        </div>
      </div>
    </div>
  );
}
