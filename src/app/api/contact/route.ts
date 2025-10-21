import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/Components/ContactUs/ContactSchema";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactFormData;
    const data = contactFormSchema.parse(payload);

    const result = await sendContactEmail(data);

    return NextResponse.json(
      {
        message: result.message,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors
        .map((issue) => issue.message)
        .join("\n");

      return NextResponse.json({ error: message }, { status: 400 });
    }

    console.error("Contact form submission failed", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
