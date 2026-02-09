import Link from "next/link";
import { getUserProfile, isAdmin } from "@/lib/auth";
import { products } from "@/lib/mock-data";

export default async function AdminPage() {
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
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-foreground/70">
          ภาพรวมของสินค้า ยอดขาย และการดำเนินการล่าสุด
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "ยอดขายวันนี้", value: "4,580 ฿" },
          { label: "คำสั่งซื้อใหม่", value: "32 รายการ" },
          { label: "เติมเงินรออนุมัติ", value: "6 รายการ" },
          { label: "สินค้าที่ขายดี", value: "8 รายการ" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-border/70 bg-surface p-4 shadow-sm"
          >
            <p className="text-xs text-foreground/60">{item.label}</p>
            <p className="text-lg font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold">สินค้าล่าสุด</h2>
        <div className="mt-4 grid gap-3">
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface-muted px-4 py-3 text-sm"
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

      <section className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold">รายการที่ต้องตรวจสอบ</h2>
        <div className="mt-4 grid gap-3 text-sm">
          {[
            {
              id: "topup-21",
              label: "อัปสลิปโอนธนาคาร",
              detail: "ยอด 150 ฿",
            },
            {
              id: "user-log",
              label: "แก้ไขข้อมูลผู้ใช้",
              detail: "เปลี่ยนชื่อผู้ใช้",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface-muted px-4 py-3"
            >
              <div>
                <p className="font-semibold">{item.label}</p>
                <p className="text-xs text-foreground/60">{item.detail}</p>
              </div>
              <button
                type="button"
                className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
              >
                ดูรายละเอียด
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
