"use client";

import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, idx) => {
        const current = idx + 1;
        return (
          <button
            key={current}
            type="button"
            onClick={() => onChange(current)}
            className={cn(
              "h-9 w-9 rounded-full text-sm font-semibold transition",
              current === page
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-surface-muted text-foreground/70 hover:-translate-y-0.5"
            )}
          >
            {current}
          </button>
        );
      })}
    </div>
  );
}
