"use client"

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-64 bg-neutral-200"></div>
      <div className="p-4">
        <div className="h-4 bg-neutral-200 rounded mb-3"></div>
        <div className="h-3 bg-neutral-200 rounded mb-4 w-3/4"></div>
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-neutral-200 rounded-full"></div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-64 bg-neutral-200"></div>
    </div>
  )
}
