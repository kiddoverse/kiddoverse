import Link from "next/link";
import Image from "next/image";
import { getUserProfile, isAdmin } from "@/lib/auth";
import { products } from "@/lib/mock-data";
import { ProductForm } from "@/components/admin/product-form";

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

      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">รายการสินค้า</h2>
          <ProductForm triggerLabel="เพิ่มสินค้าใหม่" />
        </div>
        <div className="mt-4 grid gap-3 text-sm">
          {products.slice(0, 8).map((product) => (
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
              <div className="flex flex-1 items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{product.name}</p>
                  <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <span>{product.category}</span>
                    <span>•</span>
                    <span>
                      {product.salePrice
                        ? `${product.salePrice} ฿`
                        : `${product.price} ฿`}
                    </span>
                    <span>•</span>
                    <span className="rounded-full bg-success/15 px-2 py-0.5 text-success">
                      {product.status === "available" ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                    </span>
                  </div>
                </div>
                <ProductForm
                  product={product}
                  triggerLabel="จัดการสินค้า"
                  variant="outline"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
