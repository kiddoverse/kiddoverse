"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  imageUrl: string;
  category: string;
};

export function CartClient({ items }: { items: CartItem[] }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const [selected, setSelected] = useState<string[]>(
    items.map((item) => item.id)
  );

  const total = useMemo(
    () =>
      cartItems
        .filter((item) => selected.includes(item.id))
        .reduce((sum, item) => sum + (item.salePrice ?? item.price), 0),
    [cartItems, selected]
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setCartItems((prev) =>
      prev.filter((item) => !selected.includes(item.id))
    );
    setSelected([]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border/70 bg-surface p-4 shadow-sm">
          <div className="text-sm text-foreground/70">
            เลือกแล้ว {selected.length} รายการ
          </div>
          <button
            type="button"
            onClick={deleteSelected}
            disabled={selected.length === 0}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition",
              selected.length === 0
                ? "bg-surface-muted text-foreground/50"
                : "bg-danger/10 text-danger hover:-translate-y-0.5"
            )}
          >
            <Trash2 size={14} />
            ลบรายการที่เลือก
          </button>
        </div>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col gap-4 rounded-3xl border border-border/70 bg-surface p-4 shadow-sm sm:flex-row sm:items-center",
              selected.includes(item.id) ? "ring-2 ring-primary/40" : ""
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={cn(
                "mt-1 h-6 w-6 flex-none rounded-full border-2 transition",
                selected.includes(item.id)
                  ? "border-primary bg-primary/20"
                  : "border-border/70 bg-transparent"
              )}
              aria-label="เลือกสินค้า"
            >
              {selected.includes(item.id) ? (
                <span className="mx-auto block h-2.5 w-2.5 rounded-full bg-primary" />
              ) : null}
            </button>

            <div className="relative h-28 w-28 flex-none overflow-hidden rounded-2xl">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <span className="text-xs text-foreground/60">{item.category}</span>
              <h3 className="text-base font-semibold">{item.name}</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">
                  {(item.salePrice ?? item.price).toLocaleString("th-TH")} ฿
                </span>
                {item.salePrice ? (
                  <span className="text-xs text-foreground/50 line-through">
                    {item.price.toLocaleString("th-TH")} ฿
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ShoppingCart size={18} />
          <h2 className="text-lg font-semibold">สรุปการชำระ</h2>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>รายการที่เลือก</span>
          <span>{selected.length} รายการ</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>ยอดรวม</span>
          <span className="text-base font-semibold">
            {total.toLocaleString("th-TH")} ฿
          </span>
        </div>
        <button
          type="button"
          className="mt-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5"
        >
          ชำระด้วยเครดิตในวอลเล็ต
        </button>
      </div>
    </div>
  );
}
