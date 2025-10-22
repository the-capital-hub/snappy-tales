declare module "nodemailer" {
  interface AuthOptions {
    user: string;
    pass: string;
  }

  interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    service?: string;
    auth?: AuthOptions;
  }

  interface MailOptions {
    from: string;
    to: string | string[];
    replyTo?: string;
    subject: string;
    text?: string;
    html?: string;
  }

  interface Transporter {
    sendMail(options: MailOptions): Promise<unknown>;
  }

  export function createTransport(options: TransportOptions): Transporter;

  const nodemailer: {
    createTransport: typeof createTransport;
  };

  export default nodemailer;
}
