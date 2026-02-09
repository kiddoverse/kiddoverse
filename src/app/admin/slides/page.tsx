import Link from "next/link";
import { getUserProfile, isAdmin } from "@/lib/auth";
import { SlideManager } from "@/components/admin/slide-manager";

export default async function AdminSlidesPage() {
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
        <h1 className="text-3xl font-semibold">จัดการสไลด์</h1>
        <p className="text-sm text-foreground/70">
          เพิ่ม ลบ แก้ไขสไลด์หน้าแรก พร้อมกำหนดข้อความและปุ่ม
        </p>
      </div>

      <SlideManager />
    </div>
  );
}
