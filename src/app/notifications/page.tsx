import Link from "next/link";
import { Bell } from "lucide-react";
import { getUserProfile } from "@/lib/auth";

export default async function NotificationsPage() {
  const { user } = await getUserProfile();

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">ต้องเข้าสู่ระบบก่อน</h1>
        <p className="text-sm text-foreground/70">
          กรุณาเข้าสู่ระบบเพื่อดูการแจ้งเตือน
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

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6">
      <div className="flex items-center gap-2">
        <Bell size={20} />
        <h1 className="text-3xl font-semibold">การแจ้งเตือน</h1>
      </div>
      <div className="grid gap-3">
        {[
          "เติมเงินสำเร็จ 100 ฿",
          "มีสินค้าใหม่ในหมวดสื่อการสอน",
          "คำสั่งซื้อของคุณพร้อมดาวน์โหลดแล้ว",
        ].map((message, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border/70 bg-surface px-4 py-3 text-sm shadow-sm"
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
