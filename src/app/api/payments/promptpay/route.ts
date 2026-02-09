import { NextResponse } from "next/server";
import { createPromptPayCharge } from "@/lib/payments/opn";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = await request.json();
  const amount = Number(body.amount ?? 0);

  if (Number.isNaN(amount) || amount < 20) {
    return NextResponse.json({ error: "INVALID_AMOUNT" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const reference = `topup_${user.id}_${Date.now()}`;

  const { data: topup, error } = await admin
    .from("wallet_topups")
    .insert({
      user_id: user.id,
      amount,
      method: "promptpay",
      status: "pending",
      provider_reference: reference,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "TOPUP_CREATE_FAILED" }, { status: 500 });
  }

  const charge = await createPromptPayCharge({
    amount,
    description: "เติมเงิน Kiddoverse",
    reference,
  });

  return NextResponse.json({ topupId: topup.id, charge });
}
