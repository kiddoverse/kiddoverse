"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, Shield, UserCircle } from "lucide-react";
import { signOutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

type MenuGroup = {
  label: string;
  items: { label: string; href: string }[];
};

export function ProfileMenu({
  displayName,
  avatarUrl,
  role,
}: {
  displayName: string;
  avatarUrl?: string;
  role: "customer" | "admin";
}) {
  const [open, setOpen] = useState(false);
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

  const groups: MenuGroup[] = [
    {
      label: "บัญชีของฉัน",
      items: [
        { label: "โปรไฟล์", href: "/profile" },
        { label: "วอลเล็ต", href: "/wallet" },
        { label: "การแจ้งเตือน", href: "/notifications" },
      ],
    },
    {
      label: "การซื้อของฉัน",
      items: [
        { label: "ตะกล้าสินค้า", href: "/cart" },
        { label: "สินค้าทั้งหมด", href: "/products" },
      ],
    },
  ];

  if (role === "admin") {
    groups.push(
      {
        label: "สินค้าของแอดมิน",
        items: [
          { label: "รายการสินค้า", href: "/admin/products" },
          { label: "สร้างสินค้าใหม่", href: "/admin/products#create" },
        ],
      },
      {
        label: "รายงานและการจัดการ",
        items: [
          { label: "แดชบอร์ด", href: "/admin" },
          { label: "รายงานภาพรวม", href: "/admin#reports" },
        ],
      }
    );
  }

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
            {groups.map((group) => (
              <div key={group.label} className="rounded-xl bg-surface-muted px-3 py-2">
                <p className="text-xs font-semibold text-foreground/70">
                  {group.label}
                </p>
                <div className="mt-2 flex flex-col gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "rounded-lg px-2 py-1 text-sm text-foreground/80 transition",
                        "hover:bg-primary/10 hover:text-primary"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
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
