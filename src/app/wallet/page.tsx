import Link from "next/link";
import { WalletClient } from "@/components/wallet-client";
import { getUserProfile } from "@/lib/auth";

export default async function WalletPage() {
  const { user } = await getUserProfile();

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">ต้องเข้าสู่ระบบก่อนใช้วอลเล็ต</h1>
        <p className="text-sm text-foreground/70">
          กรุณาเข้าสู่ระบบเพื่อเติมเงินและจัดการเครดิต
        </p>
        <Link
          href="/login"
          className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md"
        >
          ไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">วอลเล็ต</h1>
        <p className="text-sm text-foreground/70">
          เติมเงินผ่าน PromptPay หรือโอนผ่านธนาคารได้ตามต้องการ
        </p>
      </div>

      <WalletClient balance={320} />
    </div>
  );
}
