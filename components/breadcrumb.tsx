"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-neutral-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="w-4 h-4 text-neutral-400" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-900 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
