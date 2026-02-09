"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Clock, CreditCard, QrCode, Upload } from "lucide-react";
import { bankAccounts, topupHistory } from "@/lib/mock-wallet";
import { cn } from "@/lib/utils";

const presets = [20, 50, 100, 150];

export function WalletClient({ balance }: { balance: number }) {
  const [amount, setAmount] = useState(20);
  const [customAmount, setCustomAmount] = useState("");
  const [method, setMethod] = useState<"promptpay" | "bank">("promptpay");
  const [bankId, setBankId] = useState(bankAccounts[0]?.id ?? "");
  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    if (method !== "promptpay") return;
    setCountdown(300);
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [method]);

  const selectedAmount = customAmount ? Number(customAmount) : amount;
  const selectedBank = bankAccounts.find((bank) => bank.id === bankId);
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const isValidAmount = useMemo(() => selectedAmount >= 20, [selectedAmount]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold">ยอดคงเหลือ</h2>
          <div className="mt-3 text-3xl font-semibold text-primary">
            {balance.toLocaleString("th-TH")} ฿
          </div>
          <p className="text-sm text-foreground/60">
            เติมขั้นต่ำ 20 บาทต่อครั้ง
          </p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
          <h3 className="text-base font-semibold">เติมเงินเข้าวอลเล็ต</h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount("");
                }}
                className={cn(
                  "rounded-2xl border px-4 py-2 text-sm font-semibold transition",
                  amount === preset && !customAmount
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-surface-muted text-foreground/70"
                )}
              >
                {preset} ฿
              </button>
            ))}
            <input
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              placeholder="กำหนดเอง"
              className="w-28 rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="mt-5 flex flex-col gap-2 text-sm">
            <label className="font-semibold">ช่องทางชำระเงิน</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMethod("promptpay")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition",
                  method === "promptpay"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-surface-muted text-foreground/70"
                )}
              >
                <QrCode size={16} />
                PromptPay
              </button>
              <button
                type="button"
                onClick={() => setMethod("bank")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition",
                  method === "bank"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-surface-muted text-foreground/70"
                )}
              >
                <CreditCard size={16} />
                โอนผ่านธนาคาร
              </button>
            </div>
          </div>

          {!isValidAmount ? (
            <p className="mt-3 text-xs text-danger">
              กรุณากรอกยอดขั้นต่ำ 20 บาท
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {method === "promptpay" ? (
          <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">PromptPay QR</h3>
              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <Clock size={14} />
                {minutes}:{seconds.toString().padStart(2, "0")}
              </div>
            </div>
            <div className="mt-4 aspect-square overflow-hidden rounded-2xl bg-surface-muted">
              <Image
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80"
                alt="PromptPay QR"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-foreground/70">
              สแกน QR เพื่อเติมเงิน {selectedAmount.toLocaleString("th-TH")} ฿
              ระบบจะตรวจสอบอัตโนมัติภายใน 5 นาที
            </p>
          </div>
        ) : (
          <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
            <h3 className="text-base font-semibold">เลือกบัญชีธนาคาร</h3>
            <div className="mt-3 grid gap-3">
              {bankAccounts.map((bank) => (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => setBankId(bank.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-3 py-2 text-left text-sm transition",
                    bankId === bank.id
                      ? "border-primary bg-primary/10"
                      : "border-border/70 bg-surface-muted"
                  )}
                >
                  <span className="relative h-8 w-8 overflow-hidden rounded-full bg-white">
                    <Image src={bank.iconUrl} alt={bank.bankName} fill />
                  </span>
                  <span className="font-semibold">{bank.bankName}</span>
                </button>
              ))}
            </div>

            {selectedBank ? (
              <div className="mt-4 rounded-2xl border border-border/70 bg-surface-muted p-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white">
                    <Image
                      src={selectedBank.qrUrl}
                      alt="QR Code"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{selectedBank.bankName}</span>
                    <span>{selectedBank.accountName}</span>
                    <span>{selectedBank.accountNumber}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                >
                  <Upload size={14} />
                  อัปโหลดสลิปโอน
                </button>
              </div>
            ) : null}
          </div>
        )}

        <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
          <h3 className="text-base font-semibold">ประวัติการเติมเงิน</h3>
          <div className="mt-3 flex flex-col gap-3 text-sm">
            {topupHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface-muted px-4 py-3"
              >
                <div>
                  <div className="font-semibold">
                    {item.amount.toLocaleString("th-TH")} ฿
                  </div>
                  <div className="text-xs text-foreground/60">
                    {item.method === "promptpay"
                      ? "PromptPay"
                      : "โอนผ่านธนาคาร"}{" "}
                    • {item.createdAt}
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    item.status === "สำเร็จ"
                      ? "bg-success/20 text-success"
                      : "bg-warning/20 text-warning"
                  )}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
