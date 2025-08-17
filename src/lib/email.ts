import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendThanks(to: string) {
  try {
    await resend.emails.send({
      from: "Team <onboarding@yourdomain.com>",
      to,
      subject: "You’re on the beta list",
      text: "Thanks for joining. We’ll reach out with next steps.",
    });
} catch (err) {
    console.error("Email send failed:", err);
    throw err;
  }
}
