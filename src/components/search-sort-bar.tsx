"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories } from "@/lib/mock-data";

export type SortOption = "recommended" | "new" | "popular" | "price-low" | "price-high";

export function SearchSortBar({
  search,
  category,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClear,
}: {
  search: string;
  category: string;
  sort: SortOption;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-surface p-4 shadow-sm md:flex-row md:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-2xl border border-border/70 bg-surface-muted px-3 py-2">
        <Search size={16} />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="ค้นหาสินค้า..."
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 text-sm">
          <SlidersHorizontal size={16} />
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option value="">ทุกหมวดหมู่</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 text-sm">
          <span className="text-xs text-foreground/70">เรียงโดย</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="bg-transparent text-sm outline-none"
          >
            <option value="recommended">แนะนำ</option>
            <option value="new">ใหม่ล่าสุด</option>
            <option value="popular">ยอดนิยม</option>
            <option value="price-low">ราคาต่ำสุด</option>
            <option value="price-high">ราคาสูงสุด</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 text-xs font-semibold text-foreground/80 transition hover:-translate-y-0.5"
        >
          <X size={14} />
          เคลียร์
        </button>
      </div>
    </div>
  );
}
