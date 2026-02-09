"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

export function SlideManager() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (slide: Slide) => {
    if (editingSlide) {
      setSlides((prev) =>
        prev.map((s) => (s.id === editingSlide.id ? slide : s))
      );
    } else {
      setSlides((prev) => [...prev, { ...slide, id: `slide-${Date.now()}` }]);
    }
    setShowForm(false);
    setEditingSlide(null);
  };

  const handleDelete = (id: string) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">รายการสไลด์</h2>
        <button
          type="button"
          onClick={() => {
            setEditingSlide(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md"
        >
          <Plus size={16} />
          เพิ่มสไลด์ใหม่
        </button>
      </div>

      <div className="grid gap-4">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative rounded-2xl border border-border/70 bg-surface-muted overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <Image
                src={slide.imageUrl}
                alt={slide.title || "Slide"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30 p-4 text-center text-white">
                {slide.title && (
                  <h3 className="text-xl font-semibold">{slide.title}</h3>
                )}
                {slide.description && (
                  <p className="text-sm">{slide.description}</p>
                )}
                {slide.buttonText && slide.buttonLink && (
                  <a
                    href={slide.buttonLink}
                    className="mt-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-3">
              <button
                type="button"
                onClick={() => {
                  setEditingSlide(slide);
                  setShowForm(true);
                }}
                className="rounded-full border border-border/70 bg-surface px-3 py-1 text-xs"
              >
                แก้ไข
              </button>
              <button
                type="button"
                onClick={() => handleDelete(slide.id)}
                className="rounded-full bg-danger/15 px-3 py-1 text-xs font-semibold text-danger"
              >
                <Trash2 size={14} className="inline" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm ? (
        <SlideForm
          slide={editingSlide}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingSlide(null);
          }}
        />
      ) : null}
    </div>
  );
}

function SlideForm({
  slide,
  onSave,
  onCancel,
}: {
  slide: Slide | null;
  onSave: (slide: Slide) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Slide>(
    slide || {
      id: "",
      imageUrl: "",
      title: "",
      description: "",
      buttonText: "",
      buttonLink: "",
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border/70 bg-surface p-6 shadow-xl">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-surface-muted"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {slide ? "แก้ไขสไลด์" : "เพิ่มสไลด์ใหม่"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-4"
        >
          <label className="flex flex-col gap-2 text-sm">
            รูปภาพสไลด์
            <input
              type="file"
              accept="image/*"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            หัวข้อ (ตัวอักษรทับสไลด์)
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="เช่น ยินดีต้อนรับสู่ Kiddoverse"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            รายละเอียด (ตัวอักษรทับสไลด์)
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="เช่น ค้นหาสินค้าดิจิตอลที่คุณต้องการ"
              rows={3}
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            ชื่อปุ่ม
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, buttonText: e.target.value }))
              }
              placeholder="เช่น ดูสินค้าทั้งหมด"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            ลิงค์ปุ่ม
            <input
              type="url"
              value={formData.buttonLink}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, buttonLink: e.target.value }))
              }
              placeholder="เช่น /products"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 outline-none"
            />
          </label>
          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-border/70 bg-surface-muted px-6 py-2 text-sm font-semibold text-foreground/80"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md"
            >
              {slide ? "บันทึกการแก้ไข" : "ยืนยัน"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
