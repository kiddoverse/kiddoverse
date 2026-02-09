"use client";

import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthCodeHandler() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const hasHash = url.hash && url.hash !== "#_=_";

    const supabase = createSupabaseBrowserClient();
    if (code) {
      supabase.auth.exchangeCodeForSession(code).finally(() => {
        window.location.replace(url.origin + url.pathname);
      });
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session && (hasHash || url.search)) {
        window.location.replace(url.origin + url.pathname);
      }
    });

    if (url.hash === "#_=_") {
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return null;
}
