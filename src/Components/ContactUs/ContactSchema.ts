import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service: z.enum(["fundraising", "webDevelopment"], {
    errorMap: () => ({
      message: "Please select a service.",
    }),
  }),
  message: z.string().min(10, "Message is too short"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
