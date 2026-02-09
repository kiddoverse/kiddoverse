"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductModal } from "@/components/product-modal";
import { SearchSortBar, type SortOption } from "@/components/search-sort-bar";
import { Pagination } from "@/components/pagination";
import { products } from "@/lib/mock-data";
import { logProductClick, logSearch } from "@/lib/analytics";

const PAGE_SIZE = 12;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!search) return;
    const timer = setTimeout(() => {
      logSearch(search);
    }, 600);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered = useMemo(() => {
    const base = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? product.category === category : true;
      return matchesSearch && matchesCategory;
    });

    return base.sort((a, b) => {
      if (sort === "price-low") {
        return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      }
      if (sort === "price-high") {
        return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      }
      if (sort === "new") {
        return a.id.localeCompare(b.id);
      }
      if (sort === "popular") {
        return b.id.localeCompare(a.id);
      }
      return 0;
    });
  }, [category, search, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectedProduct = selected
    ? products.find((product) => product.id === selected) ?? null
    : null;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">สินค้าทั้งหมด</h1>
        <p className="text-sm text-foreground/70">
          ค้นหาและจัดเรียงสินค้าได้ตรงตามความต้องการ
        </p>
      </div>

      <SearchSortBar
        search={search}
        category={category}
        sort={sort}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onCategoryChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
        onSortChange={setSort}
        onClear={() => {
          setSearch("");
          setCategory("");
          setSort("recommended");
          setPage(1);
        }}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isPurchased={false}
            onSelect={() => {
              logProductClick(product.id, "products");
              setSelected(product.id);
            }}
            onAddToCart={() => setSelected(product.id)}
          />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <ProductModal
        product={selectedProduct}
        isPurchased={false}
        onClose={() => setSelected(null)}
        onAddToCart={() => setSelected(null)}
      />
    </div>
  );
}
