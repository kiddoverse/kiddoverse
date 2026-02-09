import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-surface/80">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-md">
              K
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold">Kiddoverse</span>
              <span className="text-xs text-foreground/60">
                Digital Goods Marketplace
              </span>
            </div>
          </div>
          <p className="text-sm text-foreground/70">
            แหล่งรวมไฟล์ดิจิตอลคุณภาพสูงสำหรับงานสร้างสรรค์ทุกแบบ
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-foreground/70">
          <span className="text-base font-semibold text-foreground">ข้อมูล</span>
          <Link href="/guide">คู่มือการใช้งาน</Link>
          <Link href="/policy">นโยบาย</Link>
          <Link href="/data-deletion">ลบข้อมูลผู้ใช้</Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-base font-semibold text-foreground">ติดต่อเรา</span>
          <a
            href={process.env.NEXT_PUBLIC_SUPPORT_LINK || "https://m.me/"}
            className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5"
            target="_blank"
            rel="noreferrer"
          >
            Facebook Messenger
          </a>
        </div>
      </div>
    </footer>
  );
}
