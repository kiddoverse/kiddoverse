import crypto from "crypto";

const OPN_ENDPOINT = "https://api.opn.ooo";

export async function createPromptPayCharge({
  amount,
  description,
  reference,
}: {
  amount: number;
  description: string;
  reference: string;
}) {
  const secretKey = process.env.OPN_SECRET_KEY ?? "";
  const response = await fetch(`${OPN_ENDPOINT}/charges`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: "THB",
      description,
      source: {
        type: "promptpay",
      },
      reference,
    }),
  });

  if (!response.ok) {
    throw new Error("OPN_CREATE_CHARGE_FAILED");
  }

  return response.json();
}

export function verifyWebhookSignature(payload: string, signature: string) {
  const secret = process.env.OPN_WEBHOOK_SECRET ?? "";
  const computed = crypto
    .createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
}
