export type BankAccount = {
  id: string;
  bankName: string;
  iconUrl: string;
  accountName: string;
  accountNumber: string;
  qrUrl: string;
};

export type TopupStatus = "สำเร็จ" | "รอดำเนินการ" | "ยกเลิกแล้ว";
export type TopupMethod = "promptpay" | "bank";

export type TopupHistoryItem = {
  id: string;
  amount: number;
  method: TopupMethod;
  status: TopupStatus;
  createdAt: string;
  bankAccountId?: string | null;
  slipUploaded?: boolean;
};

export const bankAccounts: BankAccount[] = [
  {
    id: "scb",
    bankName: "ไทยพาณิชย์",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/SCB_bank_logo.svg",
    accountName: "Kiddoverse Co., Ltd.",
    accountNumber: "123-4-56789-0",
    qrUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "kbank",
    bankName: "กสิกรไทย",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/Kasikornbank_logo.svg",
    accountName: "Kiddoverse Co., Ltd.",
    accountNumber: "987-6-54321-0",
    qrUrl:
      "https://images.unsplash.com/photo-1518544889280-219f8f7e2a29?auto=format&fit=crop&w=600&q=80",
  },
];

export const topupHistory: TopupHistoryItem[] = [
  {
    id: "topup-4",
    amount: 150,
    method: "bank",
    status: "รอดำเนินการ",
    createdAt: "2026-02-06T10:30:00Z",
    bankAccountId: "scb",
    slipUploaded: false,
  },
  {
    id: "topup-3",
    amount: 80,
    method: "promptpay",
    status: "ยกเลิกแล้ว",
    createdAt: "2026-02-05T08:15:00Z",
  },
  {
    id: "topup-2",
    amount: 50,
    method: "bank",
    status: "สำเร็จ",
    createdAt: "2026-02-04T11:20:00Z",
    bankAccountId: "kbank",
    slipUploaded: true,
  },
  {
    id: "topup-1",
    amount: 100,
    method: "promptpay",
    status: "สำเร็จ",
    createdAt: "2026-02-01T09:10:00Z",
  },
];
