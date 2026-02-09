import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getWalletBalance(userId: string) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("wallets")
    .select("balance")
    .eq("user_id", userId)
    .single();

  return data?.balance ?? 0;
}

export async function getCartCount(userId: string) {
  const supabase = createSupabaseServerClient();
  const { count } = await supabase
    .from("cart_items")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  return count ?? 0;
}

export async function getUnreadNotificationsCount(userId: string) {
  const supabase = createSupabaseServerClient();
  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  return count ?? 0;
}
