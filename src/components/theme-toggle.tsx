"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70",
        "bg-surface/80 text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
      aria-label="สลับธีม"
    >
      {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : null}
    </button>
  );
}
