import "server-only";

import type { ContactFormData } from "@/Components/ContactUs/ContactSchema";

const DEFAULT_SUBJECT_PREFIX = "New contact form message from";

const DEFAULT_SUCCESS_MESSAGE =
  "Thanks for reaching out! We will get back to you shortly.";

const EMAIL_SERVICE_MISCONFIGURED_MESSAGE =
  "Email service is not configured. Please contact the administrator.";

const INVALID_BOOLEAN_MESSAGE =
  "SMTP_SECURE must be set to true or false when provided.";

const SERVICE_LABELS: Record<ContactFormData["service"], string> = {
  fundraising: "Fundraising",
  webDevelopment: "Web Development",
};

type MailOptions = {
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
};

type TransportOptions = {
  host?: string;
  port?: number;
  secure?: boolean;
  service?: string;
  auth?: {
    user: string;
    pass: string;
  };
};

type NodemailerModule = {
  createTransport: (
    options: TransportOptions,
  ) => {
    sendMail: (options: MailOptions) => Promise<unknown>;
  };
};

async function loadNodemailer(): Promise<NodemailerModule> {
  const nodemailerModule = await import("nodemailer").catch((error) => {
    console.error("Unable to load nodemailer", error);
    throw new Error(EMAIL_SERVICE_MISCONFIGURED_MESSAGE);
  });

  const candidate =
    (nodemailerModule as { default?: NodemailerModule }).default ??
    nodemailerModule;

  if (
    typeof candidate !== "object" ||
    !candidate ||
    typeof (candidate as NodemailerModule).createTransport !== "function"
  ) {
    throw new Error(EMAIL_SERVICE_MISCONFIGURED_MESSAGE);
  }

  return candidate as NodemailerModule;
}

function parseBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined || value === "") {
    return undefined;
  }

  if (/^(true|1|yes)$/i.test(value)) {
    return true;
  }

  if (/^(false|0|no)$/i.test(value)) {
    return false;
  }

  throw new Error(INVALID_BOOLEAN_MESSAGE);
}

function getConfiguredRecipients(): string[] {
  const to = process.env.CONTACT_TO_EMAIL ?? "dev.capitalhub@gmail.com";

  return to
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function getTransportOptions(): TransportOptions {
  const service = process.env.SMTP_SERVICE?.trim();
  const host = process.env.SMTP_HOST?.trim();
  const portValue = process.env.SMTP_PORT?.trim();
  const secureFlag = parseBoolean(process.env.SMTP_SECURE?.trim());
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if ((user && !pass) || (!user && pass)) {
    throw new Error(EMAIL_SERVICE_MISCONFIGURED_MESSAGE);
  }

  const auth = user && pass ? { user, pass } : undefined;

  if (service) {
    if (!auth) {
      throw new Error(EMAIL_SERVICE_MISCONFIGURED_MESSAGE);
    }

    return { service, auth };
  }

  if (!host) {
    throw new Error(EMAIL_SERVICE_MISCONFIGURED_MESSAGE);
  }

  const port = portValue ? Number.parseInt(portValue, 10) : 587;

  if (Number.isNaN(port)) {
    throw new Error("SMTP_PORT must be a valid number.");
  }

  const secure = secureFlag ?? port === 465;

  return {
    host,
    port,
    secure,
    ...(auth ? { auth } : {}),
  };
}

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
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const recipients = getConfiguredRecipients();

  if (!from || recipients.length === 0) {
    throw new Error(EMAIL_SERVICE_MISCONFIGURED_MESSAGE);
  }

  const transportOptions = getTransportOptions();
  const nodemailer = await loadNodemailer();
  const transporter = nodemailer.createTransport(transportOptions);

  const { subject, text, html } = buildEmailContent(data);

  try {
    await transporter.sendMail({
      from,
      to: recipients,
      replyTo: data.email,
      subject,
      text,
      html,
    });
  } catch (error) {
    const detail =
      error instanceof Error && error.message
        ? `Unable to send email: ${error.message}`
        : "Unable to send email.";

    throw new Error(detail);
  }

  return { message: DEFAULT_SUCCESS_MESSAGE };
}
