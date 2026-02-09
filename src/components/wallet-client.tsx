"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Clock, CreditCard, QrCode, Upload, X } from "lucide-react";
import {
  bankAccounts,
  topupHistory as seedHistory,
  type TopupHistoryItem,
  type TopupMethod,
  type TopupStatus,
} from "@/lib/mock-wallet";
import { cn } from "@/lib/utils";

const presets = [20, 50, 100, 150];

export function WalletClient({ balance }: { balance: number }) {
  const [amount, setAmount] = useState(20);
  const [customAmount, setCustomAmount] = useState("");
  const [method, setMethod] = useState<TopupMethod>("promptpay");
  const [bankId, setBankId] = useState(bankAccounts[0]?.id ?? "");
  const [countdown, setCountdown] = useState(300);
  const [showTopup, setShowTopup] = useState(false);
  const [promptpayStarted, setPromptpayStarted] = useState(false);
  const [history, setHistory] = useState<TopupHistoryItem[]>(seedHistory);
  const [activeTopupId, setActiveTopupId] = useState<string | null>(null);
  const [slipUploaded, setSlipUploaded] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [lockedAmount, setLockedAmount] = useState<number | null>(null);
  const [lockedMethod, setLockedMethod] = useState<TopupMethod | null>(null);

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

  useEffect(() => {
    const stored = window.localStorage.getItem("kiddoverse_topups");
    if (stored) {
      setHistory(JSON.parse(stored) as TopupHistoryItem[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("kiddoverse_topups", JSON.stringify(history));
  }, [history]);

  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const resetTopup = () => {
    setStep(1);
    setLockedAmount(null);
    setLockedMethod(null);
    setPromptpayStarted(false);
    setActiveTopupId(null);
    setSlipUploaded(false);
    setMethod("promptpay");
  };

  const createTopup = (payload: {
    amount: number;
    method: TopupMethod;
    status: TopupStatus;
    bankAccountId?: string | null;
    slipUploaded?: boolean;
  }) => {
    const newItem: TopupHistoryItem = {
      id: `topup-${Date.now()}`,
      amount: payload.amount,
      method: payload.method,
      status: payload.status,
      createdAt: new Date().toISOString(),
      bankAccountId: payload.bankAccountId ?? null,
      slipUploaded: payload.slipUploaded ?? false,
    };
    setHistory((prev) => [newItem, ...prev]);
    setActiveTopupId(newItem.id);
    return newItem.id;
  };

  const updateTopup = (id: string, updates: Partial<TopupHistoryItem>) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleStartPromptpay = () => {
    if (!isValidAmount) return;
    setPromptpayStarted(true);
    const id = createTopup({
      amount: selectedAmount,
      method: "promptpay",
      status: "รอดำเนินการ",
    });
    setTimeout(() => {
      updateTopup(id, { status: "สำเร็จ" });
      setShowTopup(false);
      setPromptpayStarted(false);
    }, 3000);
  };

  const handleCreateBankPending = () => {
    if (!selectedBank || !isValidAmount) return;
    const id = createTopup({
      amount: selectedAmount,
      method: "bank",
      status: "รอดำเนินการ",
      bankAccountId: selectedBank.id,
      slipUploaded: slipUploaded,
    });
    setShowTopup(false);
    setSlipUploaded(false);
    return id;
  };

  const handleContinueTopup = (item: TopupHistoryItem) => {
    setShowTopup(true);
    setLockedAmount(item.amount);
    setLockedMethod(item.method);
    setMethod(item.method);
    setAmount(item.amount);
    setCustomAmount("");
    setBankId(item.bankAccountId ?? bankAccounts[0]?.id ?? "");
    setSlipUploaded(Boolean(item.slipUploaded));
    setActiveTopupId(item.id);
    setStep(3);
  };

  const handleCancelTopup = (id: string) => {
    updateTopup(id, { status: "ยกเลิกแล้ว" });
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="rounded-3xl border border-border/70 bg-surface p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold">ยอดคงเหลือ</h2>
        <div className="mt-4 text-4xl font-semibold text-primary">
          {balance.toLocaleString("th-TH")} ฿
        </div>
        <p className="text-sm text-foreground/60">
          เติมขั้นต่ำ 20 บาทต่อครั้ง
        </p>
        <button
          type="button"
          onClick={() => setShowTopup(true)}
          className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5"
        >
          เติมเงิน
        </button>
      </div>

      <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <h3 className="text-base font-semibold">ประวัติการเติมเงิน</h3>
        <div className="mt-4 flex flex-col gap-3 text-sm">
          {sortedHistory.map((item) => {
            const isPending = item.status === "รอดำเนินการ";
            const isCancelled = item.status === "ยกเลิกแล้ว";
            const statusClass = isPending
              ? "bg-warning/15 text-warning"
              : isCancelled
              ? "bg-danger/10 text-danger"
              : "bg-success/15 text-success";

            return (
              <div
                key={item.id}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border border-border/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
                  statusClass
                )}
              >
                <div>
                  <div className="font-semibold">
                    {item.amount.toLocaleString("th-TH")} ฿
                  </div>
                  <div className="text-xs text-foreground/60">
                    {item.method === "promptpay"
                      ? "PromptPay"
                      : "โอนผ่านธนาคาร"}{" "}
                    • {new Date(item.createdAt).toLocaleString("th-TH")}
                  </div>
                </div>
                {isPending ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleContinueTopup(item)}
                      className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                    >
                      ดำเนินการต่อ
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancelTopup(item.id)}
                      className="rounded-full border border-border/70 bg-surface px-3 py-2 text-xs font-semibold text-foreground/70"
                    >
                      ยกเลิกรายการ
                    </button>
                  </div>
                ) : (
                  <span className="rounded-full bg-surface/70 px-3 py-1 text-xs font-semibold text-foreground/70">
                    {item.status}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showTopup ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-surface p-6 shadow-xl">
            <button
              type="button"
              onClick={() => {
                if (lockedMethod === "bank" && selectedBank && isValidAmount) {
                  if (!activeTopupId) {
                    handleCreateBankPending();
                    setShowTopup(false);
                    resetTopup();
                    return;
                  }
                }
                setShowTopup(false);
                resetTopup();
              }}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-surface-muted"
            >
              <X size={18} />
            </button>

            <div className="mx-auto grid w-full max-w-4xl gap-8 lg:grid-cols-[1fr_1fr]">
              {step === 1 ? (
                <div className="flex flex-col items-center gap-4 text-center">
                  <h3 className="text-base font-semibold">
                    ขั้นตอน 1: เลือกยอดเติมเงิน
                  </h3>
                  <div className="grid w-full max-w-md grid-cols-2 gap-2 sm:grid-cols-4">
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
                  </div>
                  <label className="flex w-full max-w-md flex-col gap-2 text-sm">
                    กำหนดเอง
                    <input
                      value={customAmount}
                      onChange={(event) => setCustomAmount(event.target.value)}
                      placeholder="เช่น 200"
                      className="rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 text-sm outline-none"
                    />
                  </label>
                  {!isValidAmount ? (
                    <p className="text-xs text-danger">
                      กรุณากรอกยอดขั้นต่ำ 20 บาท
                    </p>
                  ) : null}
                  <button
                    type="button"
                    disabled={!isValidAmount}
                    onClick={() => {
                      setLockedAmount(selectedAmount);
                      setStep(2);
                    }}
                    className={cn(
                      "mt-4 w-full rounded-full px-4 py-2 text-sm font-semibold transition",
                      isValidAmount
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-muted text-foreground/60"
                    )}
                  >
                    ยืนยันยอดเงิน
                  </button>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="flex flex-col items-center gap-4 text-center">
                  <h3 className="text-base font-semibold">
                    ขั้นตอน 2: เลือกช่องทางชำระเงิน
                  </h3>
                  <div className="grid w-full max-w-md gap-2 sm:grid-cols-2">
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
                  <button
                    type="button"
                    onClick={() => {
                      setLockedMethod(method);
                      setStep(3);
                    }}
                    className="mt-4 w-full rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    ยืนยันช่องทางชำระเงิน
                  </button>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="flex flex-col gap-6 lg:col-span-2">
                  {lockedMethod === "promptpay" ? (
                    <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">PromptPay QR</h3>
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <Clock size={14} />
                          {minutes}:{seconds.toString().padStart(2, "0")}
                        </div>
                      </div>
                      <div className="mt-4 w-full overflow-hidden rounded-2xl bg-surface-muted">
                        <Image
                          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"
                          alt="PromptPay QR"
                          width={1200}
                          height={800}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="mt-4 text-center text-lg font-semibold">
                        {lockedAmount?.toLocaleString("th-TH")} ฿
                      </div>
                      <p className="mt-2 text-center text-sm text-foreground/70">
                        สแกน QR เพื่อเติมเงิน ระบบจะตรวจสอบอัตโนมัติภายใน 5 นาที
                      </p>
                      <button
                        type="button"
                        onClick={handleStartPromptpay}
                        disabled={!isValidAmount || promptpayStarted}
                        className={cn(
                          "mt-4 w-full rounded-full px-4 py-2 text-sm font-semibold transition",
                          promptpayStarted
                            ? "bg-surface-muted text-foreground/60"
                            : "bg-primary text-primary-foreground"
                        )}
                      >
                        {promptpayStarted
                          ? "กำลังตรวจสอบยอด..."
                          : "ยืนยันและเริ่มตรวจสอบยอด"}
                      </button>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
                      <h3 className="text-base font-semibold">เลือกบัญชีธนาคาร</h3>
                      <div className="mt-3">
                        <select
                          value={bankId}
                          onChange={(event) => setBankId(event.target.value)}
                          className="w-full rounded-2xl border border-border/70 bg-surface-muted px-3 py-2 text-sm outline-none"
                        >
                          {bankAccounts.map((bank) => (
                            <option key={bank.id} value={bank.id}>
                              {bank.bankName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {selectedBank ? (
                        <div className="mt-4 grid gap-4 rounded-2xl border border-border/70 bg-surface-muted p-4 text-sm lg:grid-cols-[1fr_1.2fr]">
                          <div className="w-full overflow-hidden rounded-xl bg-white">
                            <Image
                              src={selectedBank.qrUrl}
                              alt="QR Code"
                              width={600}
                              height={600}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-xs text-foreground/60">
                              รายละเอียดบัญชี
                            </span>
                            <span className="font-semibold">
                              {selectedBank.bankName}
                            </span>
                            <span>{selectedBank.accountName}</span>
                            <span>{selectedBank.accountNumber}</span>
                            <div className="mt-2 text-center text-lg font-semibold">
                              {lockedAmount?.toLocaleString("th-TH")} ฿
                            </div>
                            <button
                              type="button"
                              onClick={() => setSlipUploaded(true)}
                              className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                            >
                              <Upload size={14} />
                              {slipUploaded ? "อัปโหลดแล้ว" : "อัปโหลดสลิปโอน"}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (activeTopupId) {
                                  updateTopup(activeTopupId, {
                                    slipUploaded: slipUploaded,
                                    bankAccountId: selectedBank.id,
                                  });
                                  setShowTopup(false);
                                  resetTopup();
                                  return;
                                }
                                handleCreateBankPending();
                              }}
                              className="mt-2 w-full rounded-full border border-border/70 bg-surface px-4 py-2 text-xs font-semibold text-foreground/80"
                            >
                              ยืนยันการทำรายการ
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
