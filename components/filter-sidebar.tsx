"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FilterOption {
  id: string
  label: string
}

interface FilterGroup {
  title: string
  options: FilterOption[]
}

interface FilterSidebarProps {
  filters: FilterGroup[]
  onFilterChange?: (filterId: string) => void
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["price"]))

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(group)) {
      newExpanded.delete(group)
    } else {
      newExpanded.add(group)
    }
    setExpandedGroups(newExpanded)
  }

  return (
    <aside className="hidden lg:block w-64 bg-white rounded-lg shadow-md p-6 h-fit">
      <h2 className="text-lg font-bold text-primary mb-4">Filters</h2>

      <div className="space-y-4">
        {filters.map((group) => (
          <div key={group.title} className="border-b border-neutral-200 pb-4">
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex items-center justify-between w-full font-semibold text-neutral-900 hover:text-primary transition-colors"
            >
              {group.title}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${expandedGroups.has(group.title) ? "" : "-rotate-90"}`}
              />
            </button>

            {expandedGroups.has(group.title) && (
              <div className="mt-3 space-y-2">
                {group.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      onChange={() => onFilterChange?.(option.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-neutral-600">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
