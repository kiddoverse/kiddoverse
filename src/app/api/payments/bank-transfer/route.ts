import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendAdminEmail } from "@/lib/email";

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
  const bankAccountId = body.bankAccountId as string | undefined;
  const slipPath = body.slipPath as string | undefined;

  if (Number.isNaN(amount) || amount < 20 || !bankAccountId) {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { data: topup, error } = await admin
    .from("wallet_topups")
    .insert({
      user_id: user.id,
      amount,
      method: "bank_transfer",
      status: "pending",
      bank_account_id: bankAccountId,
      slip_path: slipPath ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "TOPUP_CREATE_FAILED" }, { status: 500 });
  }

  await sendAdminEmail({
    subject: "มีรายการเติมเงินรอตรวจสอบ",
    text: `ผู้ใช้ ${user.email} ได้อัปสลิปเติมเงิน ${amount} บาท (Topup ID: ${topup.id})`,
  });

  return NextResponse.json({ topupId: topup.id });
}
