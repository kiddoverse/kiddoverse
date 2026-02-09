"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { products } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function FeaturedProductsManager() {
  // TODO: ดึงข้อมูลสินค้าที่เลือกแล้วจาก database
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);

  const toggleFeatured = (productId: string) => {
    setFeaturedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">สินค้าที่เลือกแล้ว</h2>
        <div className="grid gap-3">
          {products
            .filter((p) => featuredIds.includes(p.id))
            .map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-2xl border border-border/70 bg-surface-muted px-4 py-3"
              >
                <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-xs text-foreground/60">{product.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFeatured(product.id)}
                  className="rounded-full bg-danger/15 p-2 text-danger"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">สินค้าทั้งหมด</h2>
        <div className="grid gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-2xl border border-border/70 bg-surface-muted px-4 py-3"
            >
              <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-xs text-foreground/60">{product.category}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleFeatured(product.id)}
                disabled={featuredIds.includes(product.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  featuredIds.includes(product.id)
                    ? "bg-success/15 text-success"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {featuredIds.includes(product.id) ? (
                  "เลือกแล้ว"
                ) : (
                  <>
                    <Plus size={14} className="inline mr-1" />
                    เพิ่ม
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
