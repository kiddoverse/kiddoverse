export default function DataDeletionPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold">ลบข้อมูลผู้ใช้</h1>
      <div className="rounded-3xl border border-border/70 bg-surface p-6 text-sm text-foreground/70 shadow-sm">
        <p>
          หากคุณต้องการลบข้อมูลบัญชีและประวัติการใช้งาน ให้ส่งคำขอผ่าน
          Facebook Messenger ของเรา พร้อมระบุอีเมลที่ใช้เข้าสู่ระบบ
          และหัวข้อ “ขอลบข้อมูลผู้ใช้”
        </p>
        <p>
          หลังจากได้รับคำขอ ระบบจะดำเนินการลบข้อมูลที่เกี่ยวข้องภายใน
          7 วันทำการ และจะแจ้งผลกลับผ่านช่องทางที่คุณติดต่อ
        </p>
        <p>ช่องทางติดต่อ: Facebook Messenger ในหน้าเว็บไซต์</p>
      </div>
    </div>
  );
}
