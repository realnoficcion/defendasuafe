"use client";

import { categories } from "@/data/categories";
import type { CategorySlug } from "@/types";

interface CategoryPillsProps {
  readonly selected: CategorySlug | "todos";
  readonly onSelect: (slug: CategorySlug | "todos") => void;
}

export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-white px-5 -mx-5">
      <button
        onClick={() => onSelect("todos")}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
          selected === "todos"
            ? "bg-gradient-to-r from-sunset-500 to-sunset-400 text-white shadow-sm glow-soft"
            : "glass text-slate-600"
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            selected === cat.slug
              ? "bg-gradient-to-r from-sunset-500 to-sunset-400 text-white shadow-sm glow-soft"
              : "glass text-slate-600"
          }`}
        >
          {cat.icon} {cat.label}
        </button>
      ))}
    </div>
  );
}
