import z from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email id"),
    password: z
      .string()
      .min(4, "Minimum 4 characters required for the pasword"),
  }),
});
