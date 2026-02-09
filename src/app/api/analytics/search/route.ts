import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = await request.json();
  const query = String(body.query ?? "").trim();

  if (!query) {
    return NextResponse.json({ error: "INVALID_QUERY" }, { status: 400 });
  }

  await supabase.from("search_history").insert({
    user_id: user.id,
    query,
  });

  return NextResponse.json({ ok: true });
}
