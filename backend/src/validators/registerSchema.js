import z from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "name is required"),
    email: z.string().email("Email id is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    password: z.string().min(4, "password must be inserted"),
  }),
});
