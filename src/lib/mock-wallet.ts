export type BankAccount = {
  id: string;
  bankName: string;
  iconUrl: string;
  accountName: string;
  accountNumber: string;
  qrUrl: string;
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

export const topupHistory = [
  {
    id: "topup-1",
    amount: 100,
    method: "promptpay",
    status: "สำเร็จ",
    createdAt: "2026-02-01",
  },
  {
    id: "topup-2",
    amount: 50,
    method: "bank",
    status: "รอดำเนินการ",
    createdAt: "2026-02-04",
  },
];
