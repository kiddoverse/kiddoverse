export default function GuidePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold">คู่มือการใช้งาน</h1>
      <div className="rounded-3xl border border-border/70 bg-surface p-6 text-sm text-foreground/70 shadow-sm">
        <p>
          1. เข้าสู่ระบบด้วย Google หรือ Facebook เพื่อเริ่มใช้งาน
        </p>
        <p>2. เลือกสินค้าและเพิ่มลงตะกล้า</p>
        <p>3. เติมเงินเข้าวอลเล็ตผ่าน PromptPay หรือโอนธนาคาร</p>
        <p>4. ชำระด้วยเครดิตและดาวน์โหลดไฟล์ได้ทันที</p>
      </div>
    </div>
  );
}
