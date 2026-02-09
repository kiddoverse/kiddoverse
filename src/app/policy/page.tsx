export default function PolicyPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold">นโยบาย</h1>
      <div className="rounded-3xl border border-border/70 bg-surface p-6 text-sm text-foreground/70 shadow-sm">
        <p>• ไฟล์ที่ซื้อแล้วสามารถดาวน์โหลดได้ตลอด ไม่มีวันหมดอายุ</p>
        <p>• ไม่อนุญาตให้นำไฟล์ไปแจกจ่ายต่อโดยไม่ได้รับอนุญาต</p>
        <p>• การโอนผ่านธนาคารต้องอัปสลิปและรอแอดมินอนุมัติ</p>
        <p>
          • ข้อมูลที่เก็บ: ข้อมูลบัญชีผู้ใช้, ประวัติการสั่งซื้อ, ประวัติการเติมเงิน,
          ประวัติการค้นหา และการคลิกสินค้า เพื่อพัฒนาประสบการณ์ใช้งาน
        </p>
        <p>
          • หากต้องการลบข้อมูล โปรดดูขั้นตอนในหน้า “ลบข้อมูลผู้ใช้”
        </p>
      </div>
    </div>
  );
}
