"use client";

import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthCodeHandler() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const hasHash = url.hash && url.hash !== "#_=_";

    const supabase = createSupabaseBrowserClient();
    console.log("[Auth] AuthCodeHandler init", {
      hasCode: Boolean(code),
      hash: url.hash,
      search: url.search,
    });
    if (code) {
      console.log("[Auth] Exchanging code for session...");
      supabase.auth.exchangeCodeForSession(code).finally(() => {
        console.log("[Auth] Code exchange finished, reloading clean URL");
        window.location.replace(url.origin + url.pathname);
      });
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      console.log("[Auth] Session check", {
        hasSession: Boolean(data.session),
      });
      if (data.session && (hasHash || url.search)) {
        console.log("[Auth] Session exists, reloading clean URL");
        window.location.replace(url.origin + url.pathname);
      }
    });

    if (url.hash === "#_=_") {
      console.log("[Auth] Cleaning Facebook hash");
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return null;
}
