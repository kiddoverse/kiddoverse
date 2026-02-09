import Link from "next/link";
import { Bell, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getUserProfile, isAdmin } from "@/lib/auth";
import {
  getCartCount,
  getUnreadNotificationsCount,
  getWalletBalance,
} from "@/lib/queries";
import { ProfileMenu } from "@/components/profile-menu";

export async function Header() {
  const { user, profile } = await getUserProfile();
  const showAuth = Boolean(user);
  const showAdmin = showAuth && isAdmin(profile);
  const displayName =
    (user?.user_metadata?.name as string | undefined) ??
    (user?.user_metadata?.full_name as string | undefined) ??
    profile?.display_name ??
    user?.email ??
    "โปรไฟล์";
  const avatarUrl =
    (user?.user_metadata?.avatar_url as string | undefined) ??
    (user?.user_metadata?.picture as string | undefined) ??
    profile?.avatar_url ??
    undefined;
  const cartCount = user ? await getCartCount(user.id) : 0;
  const notifications = user ? await getUnreadNotificationsCount(user.id) : 0;
  const walletBalance = user ? await getWalletBalance(user.id) : 0;

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

          {showAuth ? (
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
          ) : null}

          {showAuth ? (
            <Link
              href="/cart"
              className="relative rounded-full border border-border/70 bg-surface p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-success text-xs font-semibold text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          ) : null}

          {showAuth ? (
            <ProfileMenu
              displayName={displayName}
              avatarUrl={avatarUrl}
              role={profile?.role ?? "customer"}
              userId={user.id}
              walletBalance={walletBalance}
            />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
