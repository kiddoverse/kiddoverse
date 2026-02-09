"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider: "google" | "facebook") => {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    console.log("[Auth] Start OAuth:", provider);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    console.log("[Auth] Redirecting to provider:", provider);
    setLoading(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-4 py-16 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">เข้าสู่ระบบ</h1>
        <p className="text-sm text-foreground/70">
          ใช้บัญชี Google หรือ Facebook เพื่อเริ่มใช้งาน Kiddoverse
        </p>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleLogin("google")}
          disabled={loading}
          className="rounded-2xl border border-border/70 bg-surface py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5"
        >
          เข้าด้วย Google
        </button>
        <button
          type="button"
          onClick={() => handleLogin("facebook")}
          disabled={loading}
          className="rounded-2xl border border-border/70 bg-surface py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5"
        >
          เข้าด้วย Facebook
        </button>
      </div>
    </div>
  );
}
