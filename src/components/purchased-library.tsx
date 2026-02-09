"use client";

import Image from "next/image";
import { Printer, Download } from "lucide-react";
import { products } from "@/lib/mock-data";

export function PurchasedLibrary() {
  const items = products.slice(0, 6);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-surface p-4 shadow-sm"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-success px-3 py-1 text-xs font-semibold text-white">
              มีแล้ว
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="line-clamp-2 text-sm font-semibold">{item.name}</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <select className="w-full appearance-none rounded-full border border-border/70 bg-surface-muted px-4 py-2 text-xs font-semibold">
                  <option>ดาวน์โหลด JPG/PNG</option>
                  <option>ดาวน์โหลด PDF</option>
                </select>
                <Download
                  size={14}
                  className="pointer-events-none absolute right-3 top-2.5 text-foreground/60"
                />
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-surface-muted text-foreground/70"
              >
                <Printer size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
