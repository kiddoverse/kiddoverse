import nodemailer from "nodemailer";

export async function sendAdminEmail({
  subject,
  text,
}: {
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `Kiddoverse <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL ?? "kiddoverse.com@gmail.com",
    subject,
    text,
  });
}
