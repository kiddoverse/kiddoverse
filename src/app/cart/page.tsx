import Link from "next/link";
import { CartClient } from "@/components/cart-client";
import { getUserProfile } from "@/lib/auth";
import { products } from "@/lib/mock-data";

export default async function CartPage() {
  const { user } = await getUserProfile();

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">ต้องเข้าสู่ระบบก่อนใช้ตะกล้า</h1>
        <p className="text-sm text-foreground/70">
          กรุณาเข้าสู่ระบบด้วย Google หรือ Facebook เพื่อจัดการตะกล้าสินค้า
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

  const items = products.slice(0, 3).map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    salePrice: product.salePrice,
    imageUrl: product.imageUrl,
    category: product.category,
  }));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">ตะกล้าสินค้า</h1>
        <p className="text-sm text-foreground/70">
          เลือกเฉพาะรายการที่ต้องการชำระก่อน
        </p>
      </div>

      <CartClient items={items} />
    </div>
  );
}
