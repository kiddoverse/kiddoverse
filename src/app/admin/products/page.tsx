import Link from "next/link";
import { getUserProfile, isAdmin } from "@/lib/auth";
import { products } from "@/lib/mock-data";

export default async function AdminProductsPage() {
  const { user, profile } = await getUserProfile();

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">ต้องเข้าสู่ระบบก่อน</h1>
        <p className="text-sm text-foreground/70">
          กรุณาเข้าสู่ระบบด้วยบัญชีแอดมิน
        </p>
        <Link
          href="/login"
          className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md"
        >
          ไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  if (!isAdmin(profile)) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">สิทธิ์ไม่เพียงพอ</h1>
        <p className="text-sm text-foreground/70">
          หน้านี้สำหรับผู้ดูแลระบบเท่านั้น
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">จัดการสินค้า</h1>
        <p className="text-sm text-foreground/70">
          รายการสินค้าและฟอร์มสำหรับเพิ่มสินค้าใหม่
        </p>
      </div>

      <section id="create" className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold">สร้างสินค้าใหม่</h2>
        <form className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            ชื่อสินค้า
            <input
              type="text"
              placeholder="เช่น Kiddo Pack 01"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            หมวดหมู่
            <input
              type="text"
              placeholder="เช่น สื่อการสอน"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            แท็กคำ
            <input
              type="text"
              placeholder="คั่นด้วยเครื่องหมาย ,"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            แท็กสถานะ (เช่น ยอดนิยม)
            <input
              type="text"
              placeholder="popular"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            ราคาเดิม
            <input
              type="number"
              placeholder="99"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            ราคาลด
            <input
              type="number"
              placeholder="79"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            ไฟล์ภาพ (JPG/PNG)
            <input
              type="file"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            ไฟล์ PDF
            <input
              type="file"
              className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="button"
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md"
            >
              บันทึกสินค้า
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold">รายการสินค้า</h2>
        <div className="mt-4 grid gap-3 text-sm">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-surface-muted px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-xs text-foreground/60">
                  {product.category} • {product.price} ฿
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-border/70 bg-surface px-3 py-1 text-xs"
              >
                แก้ไข
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
