import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/payments/opn";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature =
    request.headers.get("x-opn-signature") ??
    request.headers.get("x-omise-signature") ??
    "";

  if (!verifyWebhookSignature(payload, signature)) {
    return NextResponse.json({ error: "INVALID_SIGNATURE" }, { status: 401 });
  }

  const event = JSON.parse(payload);
  const charge = event?.data;

  if (!charge || charge.status !== "successful") {
    return NextResponse.json({ received: true });
  }

  const admin = createSupabaseAdminClient();
  const reference = charge.reference;

  const { data: topup } = await admin
    .from("wallet_topups")
    .select("id, user_id, amount, status")
    .eq("provider_reference", reference)
    .single();

  if (!topup || topup.status === "confirmed") {
    return NextResponse.json({ received: true });
  }

  await admin
    .from("wallet_topups")
    .update({ status: "confirmed" })
    .eq("id", topup.id);

  await admin.rpc("increment_wallet_balance", {
    p_user_id: topup.user_id,
    p_amount: topup.amount,
  });

  return NextResponse.json({ received: true });
}
