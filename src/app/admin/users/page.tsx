import Link from "next/link";
import Image from "next/image";
import { getUserProfile, isAdmin } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default async function AdminUsersPage() {
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

  // TODO: ดึงข้อมูลผู้ใช้จาก Supabase
  const mockUsers = [
    {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      role: "customer",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      isBlocked: false,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">จัดการผู้ใช้งาน</h1>
        <p className="text-sm text-foreground/70">
          กำหนดสิทธิ์ บล็อค และส่งข้อความแจ้งเตือน
        </p>
      </div>

      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">รายการผู้ใช้งาน</h2>
        <div className="grid gap-3 text-sm">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 rounded-2xl border border-border/70 bg-surface-muted px-4 py-3"
            >
              <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full">
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-foreground/60 truncate">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    defaultValue={user.role}
                    className="rounded-full border border-border/70 bg-surface px-3 py-1 text-xs outline-none"
                  >
                    <option value="customer">ลูกค้า</option>
                    <option value="admin">แอดมิน</option>
                  </select>
                  <button
                    type="button"
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      user.isBlocked
                        ? "bg-success/15 text-success"
                        : "bg-danger/15 text-danger"
                    )}
                  >
                    {user.isBlocked ? "ปลดบล็อค" : "บล็อค"}
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-border/70 bg-surface px-3 py-1 text-xs"
                  >
                    ส่งข้อความ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
