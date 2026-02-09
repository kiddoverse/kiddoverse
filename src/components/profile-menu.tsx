"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  ChevronDown,
  Copy,
  Image,
  LifeBuoy,
  LogOut,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  UserCircle,
  Users,
  Wallet,
} from "lucide-react";
import { signOutAction } from "@/app/actions/auth";

export function ProfileMenu({
  displayName,
  avatarUrl,
  role,
  userId,
  walletBalance,
}: {
  displayName: string;
  avatarUrl?: string;
  role: "customer" | "admin";
  userId: string;
  walletBalance: number;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const supportLink =
    process.env.NEXT_PUBLIC_SUPPORT_LINK ?? "https://m.me/yourpage";

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const formatUid = (value: string) => {
    if (value.length <= 12) return value;
    return `${value.slice(0, 6)}...${value.slice(-4)}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        {avatarUrl ? (
          <span className="relative h-7 w-7 overflow-hidden rounded-full border border-border/70">
            <Image
              src={avatarUrl}
              alt={displayName}
              fill
              className="object-cover"
            />
          </span>
        ) : (
          <UserCircle size={18} />
        )}
        <span className="hidden sm:inline">{displayName}</span>
        <ChevronDown size={16} className="text-foreground/60" />
      </button>

      {open ? (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-border/70 bg-surface p-3 shadow-xl">
          {role === "admin" ? (
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
              <Shield size={14} />
              แอดมิน
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-surface-muted px-3 py-2">
              <p className="text-xs font-semibold text-foreground/70">ผู้ใช้</p>
              <div className="mt-2 flex flex-col gap-1">
                <Link
                  href="/wallet"
                  className="flex items-center justify-between rounded-lg px-2 py-1 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <span className="inline-flex items-center gap-2">
                    <Wallet size={16} />
                    ยอดคงเหลือ
                  </span>
                  <span className="font-semibold">
                    {walletBalance.toLocaleString("th-TH")} ฿
                  </span>
                </Link>
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingBag size={16} />
                  สินค้าที่ซื้อแล้ว
                </Link>
                <div className="flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-sm text-foreground/80">
                  <span className="inline-flex items-center gap-2">
                    <UserCircle size={16} />
                    UID: {formatUid(userId)}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface px-2 py-1 text-xs font-semibold text-foreground/70 transition hover:bg-primary/10 hover:text-primary"
                  >
                    <Copy size={12} />
                    {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                  </button>
                </div>
                <Link
                  href={supportLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <LifeBuoy size={16} />
                  ติดต่อ support
                </Link>
              </div>
            </div>

            {role === "admin" ? (
              <div className="rounded-xl bg-surface-muted px-3 py-2">
                <p className="text-xs font-semibold text-foreground/70">แอดมิน</p>
                <div className="mt-2 flex flex-col gap-1">
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <BarChart3 size={16} />
                    รายงาน
                  </Link>
                  <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <Package size={16} />
                    จัดการสินค้า
                  </Link>
                  <Link
                    href="/admin/users"
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <Users size={16} />
                    จัดการผู้ใช้งาน
                  </Link>
                  <Link
                    href="/admin/slides"
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <Image size={16} />
                    จัดการสไลด์
                  </Link>
                  <Link
                    href="/admin/home-products"
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <ShoppingBag size={16} />
                    กำหนดสินค้าหน้าแรก
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <Settings size={16} />
                    ตั้งค่าระบบ
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          <form action={signOutAction} className="mt-3">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border/70 bg-surface px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <LogOut size={16} />
              ออกจากระบบ
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
