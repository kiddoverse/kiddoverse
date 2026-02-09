"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, Copy, LogOut, Package, Settings, Shield, ShoppingBag, UserCircle, Wallet } from "lucide-react";
import { signOutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
};

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

  const handleCopyUid = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy UID:", err);
    }
  };

  const userItems: MenuItem[] = [
    {
      label: `วอลเล็ต • ${walletBalance.toLocaleString("th-TH")} ฿`,
      href: "/wallet",
      icon: <Wallet size={16} />,
    },
    {
      label: "สินค้าที่ซื้อแล้ว",
      href: "/profile",
      icon: <ShoppingBag size={16} />,
    },
    {
      label: "UID",
      icon: <UserCircle size={16} />,
      onClick: handleCopyUid,
    },
    {
      label: "ติดต่อ support",
      href: "/support",
      icon: <Settings size={16} />,
    },
  ];

  const adminItems: MenuItem[] = [
    {
      label: "รายงาน",
      href: "/admin",
      icon: <Shield size={16} />,
    },
    {
      label: "จัดการสินค้า",
      href: "/admin/products",
      icon: <Package size={16} />,
    },
    {
      label: "จัดการผู้ใช้งาน",
      href: "/admin/users",
      icon: <UserCircle size={16} />,
    },
    {
      label: "จัดการสไลด์",
      href: "/admin/slides",
      icon: <Settings size={16} />,
    },
    {
      label: "กำหนดสินค้าหน้าแรก",
      href: "/admin/featured-products",
      icon: <Package size={16} />,
    },
    {
      label: "ตั้งค่าระบบ",
      href: "/admin/settings",
      icon: <Settings size={16} />,
    },
  ];

  const displayUid = userId.length > 20 
    ? `${userId.slice(0, 10)}...${userId.slice(-10)}` 
    : userId;

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
        <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-border/70 bg-surface p-3 shadow-xl">
          {role === "admin" ? (
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
              <Shield size={14} />
              แอดมิน
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            {/* ส่วนผู้ใช้ */}
            <div className="rounded-xl bg-surface-muted px-3 py-2">
              <p className="text-xs font-semibold text-foreground/70 mb-2">
                ส่วนผู้ใช้
              </p>
              <div className="flex flex-col gap-1">
                {userItems.map((item, idx) => {
                  if (item.label === "UID") {
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={item.onClick}
                        className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="font-mono text-xs">{displayUid}</span>
                        </div>
                        {copied ? (
                          <Check size={14} className="text-success" />
                        ) : (
                          <Copy size={14} className="text-foreground/50" />
                        )}
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={item.label}
                      href={item.href ?? "#"}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground/80 transition",
                        "hover:bg-primary/10 hover:text-primary"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ส่วนแอ็ดมิน */}
            {role === "admin" ? (
              <div className="rounded-xl bg-surface-muted px-3 py-2">
                <p className="text-xs font-semibold text-foreground/70 mb-2">
                  ส่วนแอ็ดมิน
                </p>
                <div className="flex flex-col gap-1">
                  {adminItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href ?? "#"}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground/80 transition",
                        "hover:bg-primary/10 hover:text-primary"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
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
