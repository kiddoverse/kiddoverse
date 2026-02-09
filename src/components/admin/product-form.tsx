"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number | null;
  imageUrl: string;
  status?: string;
};

export function ProductForm({
  product,
  triggerLabel,
  variant = "primary",
}: {
  product?: Product;
  triggerLabel: string;
  variant?: "primary" | "outline";
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-semibold transition",
          variant === "primary"
            ? "bg-primary text-primary-foreground shadow-md hover:-translate-y-0.5"
            : "border border-border/70 bg-surface text-foreground/80 hover:bg-surface-muted"
        )}
      >
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border/70 bg-surface p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-surface-muted"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-semibold mb-6">
              {product ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
            </h2>

            <form className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                ชื่อสินค้า
                <input
                  type="text"
                  defaultValue={product?.name}
                  placeholder="เช่น Kiddo Pack 01"
                  className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                หมวดหมู่
                <input
                  type="text"
                  defaultValue={product?.category}
                  placeholder="เช่น สื่อการสอน"
                  className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                แท็กคำ (คั่นด้วยเครื่องหมาย ,)
                <input
                  type="text"
                  placeholder="เช่น ขายดี, แนะนำ, ใหม่"
                  className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                แท็กสถานะ (เช่น ยอดนิยม)
                <input
                  type="text"
                  placeholder="popular"
                  className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                สถานะ
                <select className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none">
                  <option value="available">เปิดใช้งาน</option>
                  <option value="disabled">ปิดใช้งาน</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                ราคาเดิม
                <input
                  type="number"
                  defaultValue={product?.price}
                  placeholder="99"
                  className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                ราคาลด
                <input
                  type="number"
                  defaultValue={product?.salePrice ?? undefined}
                  placeholder="79"
                  className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                รูปปกสำหรับแสดงหน้าเว็บ
                <input
                  type="file"
                  accept="image/*"
                  className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                ไฟล์รูป (PNG/JPG) สำหรับดาวโหลด
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                ไฟล์ PDF สำหรับดาวโหลด
                <input
                  type="file"
                  accept="application/pdf"
                  className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
                />
              </label>
              <div className="sm:col-span-2 flex gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border/70 bg-surface-muted px-6 py-2 text-sm font-semibold text-foreground/80"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md"
                >
                  {product ? "บันทึกการแก้ไข" : "ยืนยัน"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
