import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(4, "password must contains atleast four characters"),
});

export type loginDTO = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Valid email address is required"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    cpassword: z.string().min(6, "Confirm password is required"),
    workRole: z.string().min(2, "Work role is required"),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Password do not match",
    path: ["cpassword"],
  });

export type registerUserDTO = z.infer<typeof registerSchema>;
