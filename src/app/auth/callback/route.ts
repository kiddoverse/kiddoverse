import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const response = NextResponse.redirect(`${origin}/`);

  if (code) {
    console.info("[AuthCallback] Received code");
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[AuthCallback] Exchange failed", error.message);
    } else {
      console.info("[AuthCallback] Session set", {
        hasUser: Boolean(data?.session?.user),
      });
    }
  }

  return response;
}
