import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = await request.json();
  const productId = String(body.productId ?? "").trim();
  const source = body.source ? String(body.source) : null;

  if (!productId) {
    return NextResponse.json({ error: "INVALID_PRODUCT" }, { status: 400 });
  }

  await supabase.from("product_clicks").insert({
    user_id: user?.id ?? null,
    product_id: productId,
    source,
  });

  return NextResponse.json({ ok: true });
}
