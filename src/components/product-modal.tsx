"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ProductModal({
  product,
  isPurchased,
  onClose,
  onAddToCart,
}: {
  product: Product | null;
  isPurchased?: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}) {
  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-surface p-6 shadow-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-surface/80 text-foreground shadow-sm transition hover:scale-105"
            >
              <X size={18} />
            </button>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.status ? (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                    {product.status}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-foreground/70">
                    {product.category}
                  </span>
                  <span className="text-lg font-semibold">
                    {(product.salePrice ?? product.price).toLocaleString(
                      "th-TH"
                    )}{" "}
                    ฿
                  </span>
                </div>
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="text-sm text-foreground/70">
                  ไฟล์คุณภาพสูง เหมาะกับการนำไปใช้ได้ทันที พร้อมอัปเดตในคลัง
                  หลังซื้อ
                </p>
                <button
                  type="button"
                  onClick={onAddToCart}
                  disabled={isPurchased}
                  className={cn(
                    "mt-auto rounded-full px-5 py-2 text-sm font-semibold transition",
                    isPurchased
                      ? "bg-success/20 text-success"
                      : "bg-primary text-primary-foreground hover:-translate-y-0.5"
                  )}
                >
                  {isPurchased ? "ซื้อแล้ว" : "เพิ่มเข้าตะกล้า"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
