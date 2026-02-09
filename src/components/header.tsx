import Link from "next/link";
import { Bell, ShoppingCart, Wallet, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getUserProfile } from "@/lib/auth";
import {
  getCartCount,
  getUnreadNotificationsCount,
  getWalletBalance,
} from "@/lib/queries";

export async function Header() {
  const { user, profile } = await getUserProfile();
  const walletBalance = user ? await getWalletBalance(user.id) : 0;
  const cartCount = user ? await getCartCount(user.id) : 0;
  const notifications = user ? await getUnreadNotificationsCount(user.id) : 0;

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-md">
            K
          </span>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-lg font-semibold">Kiddoverse</span>
            <span className="text-xs text-foreground/60">
              Digital Goods Marketplace
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/wallet"
            className="hidden items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex"
          >
            <Wallet size={16} />
            <span className="font-semibold">
              {walletBalance.toLocaleString("th-TH")} ฿
            </span>
          </Link>

          <Link
            href="/notifications"
            className="relative rounded-full border border-border/70 bg-surface p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Bell size={18} />
            {notifications > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-danger text-xs text-white">
                {notifications}
              </span>
            ) : null}
          </Link>

          <Link
            href="/cart"
            className="relative rounded-full border border-border/70 bg-surface p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-xs text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          <Link
            href={user ? "/profile" : "/login"}
            className="flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <User size={16} />
            <span className="hidden sm:inline">
              {user ? profile?.display_name ?? "โปรไฟล์" : "เข้าสู่ระบบ"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
