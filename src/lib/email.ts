import type { ContactFormData } from "@/Components/ContactUs/ContactSchema";

const RESEND_API_ENDPOINT = "https://api.resend.com/emails";

const DEFAULT_SUBJECT_PREFIX = "New contact form message from";

const DEFAULT_SUCCESS_MESSAGE =
  "Thanks for reaching out! We will get back to you shortly.";

const EMAIL_SERVICE_MISCONFIGURED_MESSAGE =
  "Email service is not configured. Please contact the administrator.";

function getConfiguredRecipients(): string[] {
  const to = process.env.CONTACT_TO_EMAIL ?? "dev.capitalhub@gmail.com";

  return to
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

const SERVICE_LABELS: Record<ContactFormData["service"], string> = {
  fundraising: "Fundraising",
  webDevelopment: "Web Development",
};

function buildEmailContent({
  firstName,
  lastName,
  email,
  phone,
  service,
  message,
}: ContactFormData) {
  const fullName = `${firstName} ${lastName}`.trim();
  const serviceLabel = SERVICE_LABELS[service] ?? service;

  const subject = `${DEFAULT_SUBJECT_PREFIX} ${fullName}`;

  const text = [
    `You have received a new message from the Snappy Tales contact form.`,
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Service: ${serviceLabel}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>You have received a new message from the Snappy Tales contact form.</p>
      <p>
        <strong>Name:</strong> ${fullName}<br />
        <strong>Email:</strong> ${email}<br />
        <strong>Phone:</strong> ${phone}<br />
        <strong>Service:</strong> ${serviceLabel}
      </p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    </div>
  `;

  return { subject, text, html };
}

export async function sendContactEmail(
  data: ContactFormData,
): Promise<{ message: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const recipients = getConfiguredRecipients();

  if (!apiKey || !from || recipients.length === 0) {
    throw new Error(EMAIL_SERVICE_MISCONFIGURED_MESSAGE);
  }

  const { subject, text, html } = buildEmailContent(data);

  const response = await fetch(RESEND_API_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    let detail = "";

    try {
      const errorData = await response.json();
      if (typeof errorData === "string") {
        detail = errorData;
      } else if (errorData && typeof errorData === "object") {
        detail =
          ("message" in errorData && typeof errorData.message === "string"
            ? errorData.message
            : JSON.stringify(errorData)) ?? "";
      }
    } catch {
      detail = `status ${response.status}`;
    }

    const message = detail
      ? `Unable to send email: ${detail}`
      : "Unable to send email.";

    throw new Error(message);
  }

  return { message: DEFAULT_SUCCESS_MESSAGE };
}
