"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/mock-data";

const statusLabels: Record<string, string> = {
  new: "ใหม่",
  popular: "ยอดนิยม",
  recommended: "แนะนำ",
  sale: "ลดราคา",
};

export function ProductCard({
  product,
  isPurchased,
  onSelect,
  onAddToCart,
}: {
  product: Product;
  isPurchased?: boolean;
  onSelect: () => void;
  onAddToCart: () => void;
}) {
  const price = product.salePrice ?? product.price;

  return (
    <div className="flex h-full flex-col gap-3 rounded-3xl border border-border/70 bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={onSelect}
        className="group relative aspect-square w-full overflow-hidden rounded-2xl"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {product.status ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
            {statusLabels[product.status] ?? product.status}
          </span>
        ) : null}
      </button>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-foreground/60">{product.category}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-foreground">
            {price.toLocaleString("th-TH")} ฿
          </span>
          {product.salePrice ? (
            <span className="text-xs text-foreground/50 line-through">
              {product.price.toLocaleString("th-TH")} ฿
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onAddToCart}
          disabled={isPurchased}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition",
            isPurchased
              ? "bg-success/20 text-success"
              : "bg-primary text-primary-foreground hover:-translate-y-0.5"
          )}
        >
          <ShoppingCart size={14} />
          {isPurchased ? "ซื้อแล้ว" : "เพิ่มตะกล้า"}
        </button>
      </div>
    </div>
  );
}
