import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";

export default async function SupportPage() {
  await requireUser();
  
  // TODO: ดึง support link จาก database settings
  const supportLink = process.env.NEXT_PUBLIC_SUPPORT_LINK || "https://m.me/yourpage";
  
  redirect(supportLink);
}
