"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export function SettingsForm() {
  const [settings, setSettings] = useState({
    supportLink: process.env.NEXT_PUBLIC_SUPPORT_LINK || "",
    // TODO: เพิ่ม settings อื่นๆ ตามต้องการ
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: บันทึก settings ไปยัง database
    console.log("Saving settings:", settings);
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Support Link</label>
          <p className="text-xs text-foreground/60 mb-2">
            ลิงค์ Facebook Messenger สำหรับติดต่อ support (ใช้ในเมนู dropdown และ footer)
          </p>
          <input
            type="url"
            value={settings.supportLink}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, supportLink: e.target.value }))
            }
            placeholder="https://m.me/yourpage"
            className="rounded-2xl border border-border/70 bg-surface-muted px-4 py-2 outline-none"
          />
        </div>

        {/* TODO: เพิ่ม settings อื่นๆ ตามต้องการ */}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md"
          >
            <Save size={16} />
            บันทึกการตั้งค่า
          </button>
        </div>
      </form>
    </div>
  );
}
