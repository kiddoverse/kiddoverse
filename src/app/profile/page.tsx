import Image from "next/image";
import Link from "next/link";
import { PurchasedLibrary } from "@/components/purchased-library";
import { getUserProfile } from "@/lib/auth";
import { signOutAction } from "@/app/actions/auth";

export default async function ProfilePage() {
  const { user, profile } = await getUserProfile();

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">ต้องเข้าสู่ระบบก่อนดูโปรไฟล์</h1>
        <p className="text-sm text-foreground/70">
          กรุณาเข้าสู่ระบบเพื่อดูประวัติและคลังสินค้า
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

  const displayName =
    (user.user_metadata?.name as string | undefined) ??
    (user.user_metadata?.full_name as string | undefined) ??
    profile?.display_name ??
    user.email ??
    "โปรไฟล์";
  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ??
    (user.user_metadata?.picture as string | undefined) ??
    profile?.avatar_url ??
    undefined;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border/70 bg-surface-muted">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName}
                fill
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">โปรไฟล์</h1>
            <p className="text-sm text-foreground/70">
              สวัสดี {displayName}
            </p>
          </div>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className="rounded-full border border-border/70 bg-surface px-4 py-2 text-sm font-semibold text-foreground/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            ออกจากระบบ
          </button>
        </form>
      </div>

      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold">สรุปบัญชี</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-surface-muted p-4 text-sm">
            <p className="text-foreground/60">ยอดซื้อทั้งหมด</p>
            <p className="text-lg font-semibold">1,280 ฿</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface-muted p-4 text-sm">
            <p className="text-foreground/60">จำนวนไฟล์ที่ซื้อ</p>
            <p className="text-lg font-semibold">18 รายการ</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface-muted p-4 text-sm">
            <p className="text-foreground/60">ยอดเติมเงินล่าสุด</p>
            <p className="text-lg font-semibold">100 ฿</p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <h2 className="text-lg font-semibold">คลังสินค้า</h2>
        <PurchasedLibrary />
      </section>
    </div>
  );
}
