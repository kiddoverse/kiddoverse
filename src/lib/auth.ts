import { createSupabaseServerClient } from "@/lib/supabase/server";

export type UserRole = "customer" | "admin";

export async function getUserProfile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile };
}

export async function requireUser() {
  const { user, profile } = await getUserProfile();
  if (!user) {
    throw new Error("AUTH_REQUIRED");
  }
  return { user, profile };
}

export function isAdmin(profile: { role?: UserRole } | null) {
  return profile?.role === "admin";
}
